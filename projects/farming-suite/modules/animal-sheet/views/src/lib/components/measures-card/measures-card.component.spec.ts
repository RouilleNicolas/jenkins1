import { Provider, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ViewportService } from '@cooperl/design-system';
import { renderElement } from '@cooperl/design-system/testing';
import { MeasuresTag } from '@cooperl/farming-suite/animal-sheet/domain';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { TranslocoLocaleService } from '@jsverse/transloco-locale';
import { ComponentInput } from '@testing-library/angular';
import { MeasuresCardComponent } from './measures-card.component';

const defaultInput: ComponentInput<MeasuresCardComponent> = {
  measuresTag: MeasuresTag.Pregnant,
  date: new Date(),
  measures: 184,
  parity: 2,
  isWeight: true,
};

const createComponent = (inputs = defaultInput, providers: Provider[] = []) => renderElement(MeasuresCardComponent, { inputs, providers });
describe('[Farming Suite - Animal Sheet] MeasuresComponent', () => {
  it('should create', async () => {
    const { fixture } = await createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('Unit Tests', () => {
    describe('measuresTagI18nKey', () => {
      it('should empty string when measuresTag had no I18nKey', async () => {
        const { fixture } = await createComponent({
          ...defaultInput,
          measuresTag: 999 as MeasuresTag,
        });
        expect(fixture.componentInstance['measuresTagI18nKey']()).toBe('');
      });
    });

    describe('measuresTagCssClass', () => {
      const testCases = [
        {
          enumValue: MeasuresTag.Pregnant,
          expected: 'pregnant',
          titleSuffix: 'when enum key is simple',
        },
        {
          enumValue: MeasuresTag.MaternityEntry,
          expected: 'maternity',
          titleSuffix: "and without entry when it's contained in enum key",
        },
        {
          enumValue: MeasuresTag.MaternityExit,
          expected: 'maternity',
          titleSuffix: "and without exit when it's contained in enum key",
        },
      ];
      for (const test of testCases) {
        it(`should return MeasureTagI18nKey with prefix measures-tag ${test.titleSuffix}`, async () => {
          const { fixture } = await createComponent({
            ...defaultInput,
            measuresTag: test.enumValue,
          });
          expect(fixture.componentInstance['measuresTagCssClass']()).toBe(`measures-tag-${test.expected}`);
        });
      }
    });
  });
  describe('Behavior Tests', () => {
    describe('isHandset', () => {
      it('should not have handset css class when viewport is not handset', async () => {
        const { fixture } = await createComponent(defaultInput, [
          {
            provide: ViewportService,
            useValue: {
              isHandsetViewport: signal(false),
            } as ViewportService,
          },
        ]);
        expect(fixture.nativeElement).not.toHaveClass('handset');
      });

      it('should have handset css class when viewport is handset', async () => {
        const { fixture } = await createComponent(defaultInput, [
          {
            provide: ViewportService,
            useValue: {
              isHandsetViewport: signal(true),
            } as ViewportService,
          },
        ]);
        expect(fixture.nativeElement).toHaveClass('handset');
      });
    });

    describe('Date', () => {
      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should contains text and date', async () => {
          const { fixture, debugElement } = await createComponent();

          setLanguageToTestedLocale(fixture);

          const translatedText = translations['farming-suite']['animal-sheet'].components.measures.date;
          const translatedDate = TestBed.inject(TranslocoLocaleService).localizeDate(defaultInput.date as Date);
          const expected = `${translatedText} ${translatedDate}`;
          const element = debugElement.query(By.css('.measures-date')).nativeElement;
          expect(element).toHaveTextContent(expected);
        });
      });
    });

    describe('Tag', () => {
      const testCases = [
        {
          measuresTag: MeasuresTag.QuarantineEntry,
          description: 'QuarantineEntry',
          expectedCssClass: 'measures-tag-quarantine',
          expectedTranslationSuffixKey: 'quarantine-entry',
        },
        {
          measuresTag: MeasuresTag.QuarantineExit,
          description: 'QuarantineExit',
          expectedCssClass: 'measures-tag-quarantine',
          expectedTranslationSuffixKey: 'quarantine-exit',
        },
        {
          measuresTag: MeasuresTag.Insemination,
          description: 'Insemination',
          expectedCssClass: 'measures-tag-insemination',
          expectedTranslationSuffixKey: 'insemination',
        },
        {
          measuresTag: MeasuresTag.Pregnant,
          description: 'Pregnant',
          expectedCssClass: 'measures-tag-pregnant',
          expectedTranslationSuffixKey: 'pregnant',
        },
        {
          measuresTag: MeasuresTag.MaternityEntry,
          description: 'MaternityEntry',
          expectedCssClass: 'measures-tag-maternity',
          expectedTranslationSuffixKey: 'maternity-entry',
        },
        {
          measuresTag: MeasuresTag.MaternityExit,
          description: 'MaternityExit',
          expectedCssClass: 'measures-tag-maternity',
          expectedTranslationSuffixKey: 'maternity-exit',
        },
        {
          measuresTag: MeasuresTag.Other,
          description: 'Other',
          expectedCssClass: 'measures-tag-other',
          expectedTranslationSuffixKey: 'other',
        },
      ];

      for (const test of testCases) {
        describe(test.description, () => {
          testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
            it('should contains text', async () => {
              const { fixture, debugElement } = await createComponent({
                ...defaultInput,
                measuresTag: test.measuresTag,
              });

              setLanguageToTestedLocale(fixture);

              const translatedText = translations['farming-suite']['animal-sheet'].components.measures[test.expectedTranslationSuffixKey];
              const element = debugElement.query(By.css('.measures-tag')).nativeElement;
              expect(element).toHaveTextContent(translatedText);
            });
          });

          it('should contains correct css class', async () => {
            const { debugElement } = await createComponent({
              ...defaultInput,
              measuresTag: test.measuresTag,
            });
            const element = debugElement.query(By.css('.measures-tag')).nativeElement;
            expect(element).toHaveClass(test.expectedCssClass);
          });
        });
      }
    });

    describe('Measures', () => {
      const testCases = [
        {
          isWeight: true,
          expectedTranslationSuffixKey: 'weight',
        },
        {
          isWeight: false,
          expectedTranslationSuffixKey: 'thickness',
        },
      ];
      for (const test of testCases) {
        describe(test.isWeight ? 'Weight' : 'Thickness', () => {
          testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
            it('should contains value of measure and text', async () => {
              const { fixture, getByText } = await createComponent({
                ...defaultInput,
                isWeight: test.isWeight,
              });

              setLanguageToTestedLocale(fixture);

              const translatedText = translations['farming-suite']['animal-sheet'].components.measures[test.expectedTranslationSuffixKey];
              const expected = `${defaultInput.measures} ${translatedText}`;
              const element = getByText(expected);
              expect(element).toBeVisible();
            });
          });
        });
      }
    });

    describe('Parity', () => {
      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should contains text and parity', async () => {
          const { fixture, debugElement } = await createComponent();

          setLanguageToTestedLocale(fixture);

          const translatedText = translations['farming-suite'].animals.sow.parity;
          const expected = `${translatedText} ${defaultInput.parity}`;
          const element = debugElement.query(By.css('.measures-parity')).nativeElement;
          expect(element).toHaveTextContent(expected);
        });
      });
    });
  });
});
