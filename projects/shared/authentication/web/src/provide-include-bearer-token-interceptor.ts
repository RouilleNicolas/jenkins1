import { inject, makeEnvironmentProviders } from '@angular/core';
import { AUTH_CONFIGS } from '@cooperl/authentication';
import { createInterceptorCondition, CustomBearerTokenCondition, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG } from 'keycloak-angular';

export const provideIncludeBearerTokenInterceptor = () =>
  makeEnvironmentProviders([
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useFactory: () => {
        const { apiBaseUrl, keycloak } = inject(AUTH_CONFIGS);
        const urlCondition = createInterceptorCondition<CustomBearerTokenCondition>({
          shouldAddToken: async (req, _, keycloak) => {
            return (req.url.startsWith(apiBaseUrl) && keycloak.authenticated) ?? false;
          },
          bearerPrefix: keycloak.bearerPrefix,
        });

        return [urlCondition];
      },
    },
  ]);
