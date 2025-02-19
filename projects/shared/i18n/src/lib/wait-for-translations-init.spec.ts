import { HttpTestingController } from '@angular/common/http/testing';
import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { browserLocale } from './locales/browser-locales.const';
import { waitForTranslationsInit } from './wait-for-translations-init';
import { LanguageService } from './wrappers';

describe('[Shared - I18n] waitForTranslationsInit', () => {
  it('should initialize LanguageService with browserLocale and wait for translation to be fetch', async () => {
    runInInjectionContext(TestBed.inject(Injector), async () => {
      const languageService = TestBed.inject(LanguageService);
      const spySetActiveLang = jest.spyOn(languageService, 'setActiveLang');
      const spySelectTranslation = jest.spyOn(languageService, 'selectTranslation');
      const httpTesting = TestBed.inject(HttpTestingController);

      const req = httpTesting.expectOne('/assets/i18n/en-GB.json', 'Request to load the translation file');
      await firstValueFrom(waitForTranslationsInit());

      expect(spySetActiveLang).toHaveBeenCalledWith(browserLocale);
      expect(spySelectTranslation).toHaveBeenCalledWith(browserLocale);

      spySetActiveLang.mockRestore();
      spySelectTranslation.mockRestore();

      req.flush({});
      httpTesting.verify();
    });
  });
});
