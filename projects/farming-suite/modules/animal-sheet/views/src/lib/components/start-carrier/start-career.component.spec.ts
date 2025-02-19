import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { LanguageService } from '@cooperl/i18n';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { ComponentInput } from '@testing-library/angular';
import { formatDistanceToNowStrict } from 'date-fns';
import { StartCareerComponent } from './start-career.component';

const defaultStartCareer: ComponentInput<StartCareerComponent> = {
  firstGivingBirth: new Date(),
  firstIA: new Date(),
};

const renderStartCareer = (element = defaultStartCareer) => renderElement(StartCareerComponent, { inputs: element });

describe('[Farming Suite - Animal Sheet] StartCareerComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderStartCareer();
    expect(fixture.componentInstance).toBeInstanceOf(StartCareerComponent);
  });

  testForAvailableLanguages(({ setLanguageToTestedLocale }) => {
    it('should contains a title translated text', async () => {
      const { fixture } = await renderStartCareer();
      setLanguageToTestedLocale(fixture);
      const translateService = TestBed.inject(LanguageService);
      const expectedText = translateService.translate('farming-suite.animal-sheet.components.start-career.title');
      expect(fixture.debugElement.query(By.css('.title')).nativeElement).toHaveTextContent(expectedText);
    });
  });

  describe('First Giving Birth', () => {
    it('should throw an error if firstGivingBirth is not provided', async () => {
      await expect(renderStartCareer({ firstGivingBirth: new Date() } as ComponentInput<StartCareerComponent>)).rejects.toThrow('NG0950');
    });

    it('should compute durationGivingBirth correctly', async () => {
      const { fixture } = await renderStartCareer();
      const expectedDuration = formatDistanceToNowStrict(new Date(), { unit: 'month' });
      expect(fixture.componentInstance.durationGivingBirth()).toBe(expectedDuration);
    });

    testForAvailableLanguages(({ setLanguageToTestedLocale }) => {
      it('should contains a translated text', async () => {
        const { fixture } = await renderStartCareer();
        setLanguageToTestedLocale(fixture);
        const translateService = TestBed.inject(LanguageService);
        const expectedText = translateService.translate('farming-suite.animal-sheet.components.start-career.subtitle-giving-birth');
        expect(fixture.debugElement.query(By.css('.content-container')).nativeElement).toHaveTextContent(expectedText);
      });
    });
  });

  describe('First IA', () => {
    it('should throw an error if firstIA is not provided', async () => {
      await expect(renderStartCareer({ firstIA: new Date() } as ComponentInput<StartCareerComponent>)).rejects.toThrow('NG0950');
    });

    it('should compute durationIA correctly', async () => {
      const { fixture } = await renderStartCareer();
      const expectedDuration = formatDistanceToNowStrict(new Date(), { unit: 'month' });
      expect(fixture.componentInstance.durationIA()).toBe(expectedDuration);
    });

    testForAvailableLanguages(({ setLanguageToTestedLocale }) => {
      it('should contains a translated text', async () => {
        const { fixture } = await renderStartCareer();
        setLanguageToTestedLocale(fixture);
        const translateService = TestBed.inject(LanguageService);
        const expectedText = translateService.translate('farming-suite.animal-sheet.components.start-career.subtitle-first-ia');
        expect(fixture.debugElement.query(By.css('.content-container')).nativeElement).toHaveTextContent(expectedText);
      });
    });
  });
});
