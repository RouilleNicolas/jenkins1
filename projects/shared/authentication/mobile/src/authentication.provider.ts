import { NgZone, inject, isDevMode, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { Params, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Device } from '@capacitor/device';
import { AUTH_CONFIGS, AuthenticationConfigs, provideAuthConfigs } from '@cooperl/authentication';
import { Logger } from '@cooperl/logger';
import { Platform } from '@ionic/angular';
import { AuthConfig, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { ProvideKeycloakOptions } from 'keycloak-angular';

export const provideAuthentication = () =>
  makeEnvironmentProviders([
    provideOAuthClient(),
    provideAppInitializer(() => {
      const initializerFn = initializeAuthentication();
      return initializerFn();
    }),
    provideAuthConfigs(),
  ]);

function initializeAuthentication() {
  const logger = new Logger('AuthenticationInitializer');
  const oauthService = inject(OAuthService);
  const platform = inject(Platform);
  const router = inject(Router);
  const zone = inject(NgZone);
  const authConfigs = inject(AUTH_CONFIGS);
  const { realm, url, clientId } = authConfigs.keycloak.config as ProvideKeycloakOptions['config'];

  const authConfig: AuthConfig = {
    issuer: `${url}/realms/${realm}`,
    redirectUri: platform.is('desktop') ? window.location.origin : authConfigs.mobileRedirectUri,
    clientId: clientId,
    // Revocation Endpoint must be set manually when using Keycloak
    // See: https://github.com/manfredsteyer/angular-oauth2-oidc/issues/794
    revocationEndpoint: `${url}/realms/${realm}/protocol/openid-connect/revoke`,
    ...authConfigs.oauth2,
    openUri: async (url: string) => await Browser.open({ url, windowName: '_self' }),
  };

  return async () => {
    logger.debug('Initializing authentication service');

    if (!logCurrentPlatformOrReject(logger, platform)) {
      return rejectInitialization('Unsupported mobile platform', logger);
    }

    if (platform.is('capacitor')) {
      updateAuthConfigForVirtualDevice(authConfig);
    }

    oauthService.configure(authConfig);
    oauthService.setupAutomaticSilentRefresh();

    addAppListenerOnAppUrlOpen(platform, authConfigs, zone, router, oauthService);

    await oauthService.loadDiscoveryDocument();

    /**
     * Always call tryLogin after the app and discovery document loaded, because we could come back from Keycloak login page.
     * The library needs this as a trigger to parse the query parameters we got from Keycloak.
     */
    await oauthService.tryLogin();

    // Ensure there is no authentication query parameters in the URL
    await router.navigateByUrl('/');
  };
}

function rejectInitialization(error: string, logger: Logger<unknown>) {
  alert(error);
  logger.error(error);
  return Promise.reject(error);
}

async function updateAuthConfigForVirtualDevice(authConfig: AuthConfig): Promise<void> {
  // Android Virtual Device needs to use 10.0.2.2 to access computer localhost
  const isVirtualDevice = (await Device.getInfo()).isVirtual;
  if (isDevMode() && isVirtualDevice) {
    const virtualDeviceIp = '10.0.2.2';
    authConfig.issuer = authConfig.issuer?.replace('localhost', virtualDeviceIp);
    authConfig.revocationEndpoint = authConfig.revocationEndpoint?.replace('localhost', virtualDeviceIp);
    authConfig.tokenEndpoint = authConfig.tokenEndpoint?.replace('localhost', virtualDeviceIp);
  }
}

function addAppListenerOnAppUrlOpen(
  platform: Platform,
  authConfigs: AuthenticationConfigs,
  zone: NgZone,
  router: Router,
  oauthService: OAuthService,
): void {
  if (platform.is('capacitor')) {
    App.addListener('appUrlOpen', (event) => {
      const url = new URL(event.url);
      const isLoginUrl = url.href.startsWith(authConfigs.mobileRedirectUri);
      if (!isLoginUrl) {
        // Only interested in redirects to myschema://login
        return;
      }

      zone.run(async () => {
        // Building a query param object for Angular Router
        const queryParams: Params = {};
        url.searchParams.forEach((value, key) => {
          queryParams[key] = value;
        });

        // Add query params to current route
        await router.navigate([], {
          relativeTo: router.routerState.root,
          queryParams: queryParams,
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        });

        // After updating the route, trigger login in oauthlib and
        await oauthService.tryLogin();

        // Force navigation to remove query parameters from the URL after auth
        await router.navigate([], {
          relativeTo: router.routerState.root,
        });
      });
    });
  }
}

function logCurrentPlatformOrReject(logger: Logger<unknown>, platform: Platform) {
  if (platform.is('desktop')) {
    logger.debug('Using web configuration');
  } else if (platform.is('capacitor')) {
    if (platform.is('ios')) {
      logger.debug('Using iOS configuration');
    } else if (platform.is('android')) {
      logger.debug('Using Android configuration');
    } else {
      return false;
    }
  }

  return true;
}
