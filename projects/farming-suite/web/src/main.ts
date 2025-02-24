import { initAuthenticationConfigs } from '@cooperl/authentication';
import { Logger } from '@cooperl/logger';

const logger = new Logger('Application start');

initAuthenticationConfigs().then(() =>
  import('./bootstrap').catch((err) => logger.error(err)),
);
