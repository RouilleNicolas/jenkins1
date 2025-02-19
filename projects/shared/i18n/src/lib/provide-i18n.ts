import { EnvironmentProviders, isDevMode, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TitleStrategy } from '@angular/router';
import { Logger } from '@cooperl/logger';
import { TranslocoService, provideTransloco } from '@jsverse/transloco';
import { provideTranslocoLocale } from '@jsverse/transloco-locale';
import { enGB } from 'date-fns/locale/en-GB';
import { I18nHttpLoader } from './i18n-http-loader.service';
import { availableLocales } from './locales/available-locales';
import { browserLocale } from './locales/browser-locales.const';
import { registerAvailableLocales } from './locales/register-available-locale-data';
import { TranslatedPaginatorIntl } from './material-intls/translated-paginator.intl';
import { TranslatedPageTitleStrategy } from './translated-page-title.strategy';
import { waitForTranslationsInit } from './wait-for-translations-init';
import { LanguageService } from './wrappers/language.service';

export const provideI18n = (): EnvironmentProviders => {
  const logger = new Logger('I18n initialization');

  logger.info(`Browser available locales: ${navigator.languages.join(', ')}`);
  logger.info(`Using ${browserLocale} locale`);

  registerAvailableLocales();
  logger.info('Registered available locales', [...availableLocales.keys()]);

  return makeEnvironmentProviders([
    provideTransloco({
      config: {
        availableLangs: [...availableLocales.keys()],
        defaultLang: browserLocale,
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: I18nHttpLoader,
    }),
    // Disclaimer: This is to "trick" transloco to use our own encapsulating service
    LanguageService,
    {
      provide: TranslocoService,
      useExisting: LanguageService,
    },
    provideTranslocoLocale({
      defaultLocale: browserLocale,
    }),
    provideAppInitializer(() => waitForTranslationsInit()),
    {
      provide: MatPaginatorIntl,
      useClass: TranslatedPaginatorIntl,
    },
    { provide: MAT_DATE_LOCALE, useValue: enGB },
    { provide: TitleStrategy, useClass: TranslatedPageTitleStrategy },
  ]);
};
