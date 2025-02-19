import { bootstrapApplication } from '@angular/platform-browser';
import { Logger } from '@cooperl/logger';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

const logger = new Logger('Application Bootstrapping');

bootstrapApplication(AppComponent, appConfig).catch((err) => logger.error(err));
