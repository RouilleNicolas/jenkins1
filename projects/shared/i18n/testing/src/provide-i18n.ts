import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { availableLocales, browserLocale, enGB, frFR, LanguageService, TranslatedPaginatorIntl } from '@cooperl/i18n';
 
import { TranslocoService, TranslocoTestingModule, TranslocoTestingOptions } from '@jsverse/transloco';
import { provideTranslocoLocale } from '@jsverse/transloco-locale';
import { enGBTestingTranslations, frFRTestingTranslations } from './translations';

/** Add this to the imports metadata */
export function getI18nTestingModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: {
      [enGB]: enGBTestingTranslations,
      [frFR]: frFRTestingTranslations,
    },
    translocoConfig: {
      availableLangs: [...availableLocales.keys()],
      defaultLang: enGB,
      reRenderOnLangChange: true,
    },
    preloadLangs: true,
    ...options,
  });
}

/** Add this to the providers metadata */
export const provideI18nTesting = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    // Disclaimer: This is to "trick" transloco to use our own encapsulating service
    LanguageService,
    {
      provide: TranslocoService,
      useExisting: LanguageService,
    },
    provideTranslocoLocale({
      defaultLocale: browserLocale,
    }),
    {
      provide: MatPaginatorIntl,
      useClass: TranslatedPaginatorIntl,
    },
    { provide: MAT_DATE_LOCALE, useValue: enGB },
  ]);
};
