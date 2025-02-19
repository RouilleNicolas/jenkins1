import { InjectionToken } from '@angular/core';
import { AuthenticationConfigs } from './interfaces/authentication-configs.interface';

/** Token containing the authentication configurations */
export const AUTH_CONFIGS = new InjectionToken<AuthenticationConfigs>('AUTH_CONFIGS');
