import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAuthentication } from '@cooperl/authentication/web';
import { provideIcons } from '@cooperl/design-system';
import { provideAnimalSheetPortsImplementations } from '@cooperl/farming-suite/animal-sheet/application';
import { provideI18n } from '@cooperl/i18n';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAuthentication(),
    provideI18n(),
    provideIcons(),
    provideAnimationsAsync(),
    provideDateFnsAdapter(),
    provideAnimalSheetPortsImplementations(),
  ],
};
