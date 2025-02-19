import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { LanguageService } from '@cooperl/i18n';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { AnnualProductionComponent } from './annual-production.component';

const renderAnnualProduction = (element = { value: 30.5 }) => renderElement(AnnualProductionComponent, { inputs: element });

describe('[Farming Suite - Animal Sheet] Annual Production', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderAnnualProduction();
    expect(fixture.componentInstance).toBeInstanceOf(AnnualProductionComponent);
  });

  testForAvailableLanguages(({ setLanguageToTestedLocale }) => {
    it('should contains a text translated text', async () => {
      const { fixture } = await renderAnnualProduction();
      setLanguageToTestedLocale(fixture);
      const translateService = TestBed.inject(LanguageService);
      const expectedText = translateService.translate('farming-suite.animal-sheet.components.annual-production.title');
      expect(fixture.debugElement.query(By.css('.title')).nativeElement).toHaveTextContent(expectedText);
    });
  });
});
