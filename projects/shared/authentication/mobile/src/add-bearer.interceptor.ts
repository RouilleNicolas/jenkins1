import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AUTH_CONFIGS } from '@cooperl/authentication';
import { Logger } from '@cooperl/logger';
import { OAuthStorage } from 'angular-oauth2-oidc';

export const addBearerInterceptor: HttpInterceptorFn = (req, next) => {
  const oAuthStorage = inject(OAuthStorage);
  const authConfigs = inject(AUTH_CONFIGS);
  const logger = new Logger('OAuthInterceptor');

  const token = oAuthStorage.getItem('access_token');
  if (req.url.startsWith(authConfigs.apiBaseUrl) && token) {
    logger.debug('Adding bearer token to request', req.url);
    const headers = req.headers.set('Authorization', `${authConfigs.keycloak.bearerPrefix} ${token}`);
    req = req.clone({ headers });
  }

  return next(req);
};
