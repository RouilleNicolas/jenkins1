import { Logger } from '@cooperl/logger';
import { AuthenticationConfigs } from './interfaces/authentication-configs.interface';

const defaultAuthenticationConfigs = {} as AuthenticationConfigs;
export let authenticationConfigs: AuthenticationConfigs = defaultAuthenticationConfigs;

/**
 * Fetch the authentication manifest and set it in a global variable
 */
export async function initAuthenticationConfigs() {
  const logger = new Logger('initAuthenticationConfigs');

  // Reset the authenticationConfigs object
  authenticationConfigs = defaultAuthenticationConfigs;

  // Fetch the authentication manifest
  // If there is no manifest, take the default values
  // The manifest should be add by deployment CD on any production environment
  try {
    const response = await fetch('/authentication.manifest.json');
    authenticationConfigs = await response.json();
  } catch (error) {
    logger.error('Failed to fetch authentication manifest, taking default values');
    logger.error(error);
  }

  Object.freeze(authenticationConfigs);
}
