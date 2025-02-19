import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot } from '@angular/router';
import { TranslatedPageTitleStrategy } from './translated-page-title.strategy';
import { LanguageService } from './wrappers';

describe('[Shared - I18n] TranslatedPageTitleStrategy', () => {
  let strategy: TranslatedPageTitleStrategy;
  let titleService: jest.Mocked<Title>;
  let languageService: jest.Mocked<LanguageService>;

  beforeEach(() => {
    const titleSpy = { setTitle: jest.fn() };
    const languageServiceSpy = { translate: jest.fn() };

    TestBed.configureTestingModule({
      providers: [TranslatedPageTitleStrategy, { provide: Title, useValue: titleSpy }, { provide: LanguageService, useValue: languageServiceSpy }],
    });

    strategy = TestBed.inject(TranslatedPageTitleStrategy);
    titleService = TestBed.inject(Title) as jest.Mocked<Title>;
    languageService = TestBed.inject(LanguageService) as jest.Mocked<LanguageService>;
  });

  it('should set translated title when title is defined', () => {
    const mockRouterState = { root: {} } as RouterStateSnapshot;
    const mockTitle = 'Test Title';
    jest.spyOn(strategy, 'buildTitle').mockReturnValue(mockTitle);
    languageService.translate.mockReturnValue('Translated Title');

    strategy.updateTitle(mockRouterState);

    expect(strategy.buildTitle).toHaveBeenCalledWith(mockRouterState);
    expect(languageService.translate).toHaveBeenCalledWith(mockTitle);
    expect(titleService.setTitle).toHaveBeenCalledWith('Translated Title');
  });

  it('should not set title when title is undefined', () => {
    const mockRouterState = { root: {} } as RouterStateSnapshot;
    jest.spyOn(strategy, 'buildTitle').mockReturnValue(undefined);

    strategy.updateTitle(mockRouterState);

    expect(strategy.buildTitle).toHaveBeenCalledWith(mockRouterState);
    expect(languageService.translate).not.toHaveBeenCalled();
    expect(titleService.setTitle).not.toHaveBeenCalled();
  });
});
