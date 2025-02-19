import { FactoryProvider } from '@angular/core';
import { AUTH_CONFIGS } from './auth-configs.token';
import { authenticationConfigs } from './authentication.configs';

export const provideAuthConfigs = (): FactoryProvider => ({
  provide: AUTH_CONFIGS,
  useFactory: () => authenticationConfigs,
});
