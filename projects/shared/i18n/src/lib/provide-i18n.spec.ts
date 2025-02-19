import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TitleStrategy } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { enGB } from 'date-fns/locale/en-GB';
import { registerAvailableLocales } from './locales/register-available-locale-data';
import { TranslatedPaginatorIntl } from './material-intls/translated-paginator.intl';
import { provideI18n } from './provide-i18n';
import { TranslatedPageTitleStrategy } from './translated-page-title.strategy';
import { LanguageService } from './wrappers/language.service';

jest.mock('./locales/register-available-locale-data', () => ({
  registerAvailableLocales: jest.fn(),
}));

const fakeLanguageService: Partial<LanguageService> = {
  setActiveLang: jest.fn().mockReturnThis(),
  selectTranslation: jest.fn(),
};

describe('[Shared - I18n] provideI18n', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideDateFnsAdapter(),
        { provide: LanguageService, useValue: fakeLanguageService },
        provideI18n(),
      ],
    }).compileComponents();
  });

  it('should register available locales', () => {
    expect(registerAvailableLocales).toHaveBeenCalled();
  });

  it('should override TranslocoService in favor of LanguageService', () => {
    const translocoService = TestBed.inject(TranslocoService);
    const languageService = TestBed.inject(LanguageService);
    expect(translocoService).toBe(languageService);
  });

  it('should set MAT_DATE_LOCALE to enGB', () => {
    const matDateLocale = TestBed.inject(MAT_DATE_LOCALE);
    expect(matDateLocale).toBe(enGB);
  });

  it('should use TranslatedPaginatorIntl for MatPaginatorIntl', () => {
    const paginatorIntl = TestBed.inject(MatPaginatorIntl);
    expect(paginatorIntl).toBeInstanceOf(TranslatedPaginatorIntl);
  });

  it('should use TranslatedPageTitleStrategy for TitleStrategy', () => {
    const titleStrategy = TestBed.inject(TitleStrategy);
    expect(titleStrategy).toBeInstanceOf(TranslatedPageTitleStrategy);
  });
});
