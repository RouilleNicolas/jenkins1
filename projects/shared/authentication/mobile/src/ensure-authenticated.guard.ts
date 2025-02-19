import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { Logger } from '@cooperl/logger';
import { OAuthService } from 'angular-oauth2-oidc';

export const ensureAuthenticated: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const oauthService = inject(OAuthService);
  const logger = new Logger('AuthGuard');

  logger.debug(`Checking if route "TODO" access is allowed`, route.url.map((x) => x.path).join('/'));

  // Check if the route is a callback from the OAuth2 server
  const isRedirectedFromOAuthServer = route.queryParamMap.has('code') && route.queryParamMap.has('state') && route.queryParamMap.has('session_state');
  const isAllowed = isRedirectedFromOAuthServer || (await oauthService.loadDiscoveryDocumentAndLogin());

  return isAllowed;
};
