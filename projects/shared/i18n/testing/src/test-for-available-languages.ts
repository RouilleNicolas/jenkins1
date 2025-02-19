import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageService, availableLocales } from '@cooperl/i18n';

interface Params<T> {
  /** The translation file content as JSON */
  translations: any;
  /** Switch language to current and apply change detection */
  setLanguageToTestedLocale: (fixture: ComponentFixture<T>) => void;
}

/** The test function to run for each available languages, this will contains the test specs (describe, it) */
type TestFn<T> = (params: Params<T>) => void;

/**
 * Encapsulate tests specs around each available languages
 *
 * @param testFn The test function to run for each available languages, this will contains the test specs (describe, it)
 */
export function testForAvailableLanguages<T>(testFn: TestFn<T>) {
  const locales = availableLocales.keys();

  for (const locale of locales) {
    try {
      const translations = require(`./translations/${locale}`).default;

      const switchLanguage = <T>(fixture: ComponentFixture<T>) => {
        const languageService = TestBed.inject(LanguageService);
        languageService.setActiveLang(locale);
        fixture.detectChanges();
      };

      const params: Params<T> = { translations, setLanguageToTestedLocale: switchLanguage };
      describe(locale, () => {
        const bkpLogFn = console.log;

        // Avoid being flooded by logs
        beforeAll(() => {
          console.log = jest.fn();
        });

        testFn(params);

        // Restore console.log
        afterAll(() => {
          console.log = bkpLogFn;
        });
      });
    } catch (_err) {
      // eslint-disable-next-line no-restricted-syntax
      console.warn(`No translations found for ${locale}`);
      it.todo(`${locale} - No translations found`);
    }
  }
}
