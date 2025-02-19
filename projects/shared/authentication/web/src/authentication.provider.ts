import { makeEnvironmentProviders } from '@angular/core';
import { authenticationConfigs, provideAuthConfigs } from '@cooperl/authentication';
import { provideKeycloak } from 'keycloak-angular';
import { provideIncludeBearerTokenInterceptor } from './provide-include-bearer-token-interceptor';

export const provideAuthentication = () =>
  makeEnvironmentProviders([provideAuthConfigs(), provideKeycloak(authenticationConfigs.keycloak), provideIncludeBearerTokenInterceptor()]);
