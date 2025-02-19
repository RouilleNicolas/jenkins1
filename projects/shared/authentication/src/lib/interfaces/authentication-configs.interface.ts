import { AuthConfig } from 'angular-oauth2-oidc';
import { BearerTokenCondition, ProvideKeycloakOptions } from 'keycloak-angular';

export interface AuthenticationConfigs {
  apiBaseUrl: string;
  mobileRedirectUri: string;
  keycloak: ProvideKeycloakOptions & BearerTokenCondition;
  oauth2: AuthConfig;
}
