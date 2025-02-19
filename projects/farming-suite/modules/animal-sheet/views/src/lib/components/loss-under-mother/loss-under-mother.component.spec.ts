import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { ComponentInput } from '@testing-library/angular';
import { InformationCardComponent } from '../information-card/information-card.component';
import { LossUnderMotherComponent } from './loss-under-mother.component';

const defaultInput: ComponentInput<LossUnderMotherComponent> = {
  lossUnderMotherPercent: 0.8,
};

const renderLossUnderMotherComponent = (element = defaultInput) => renderElement(LossUnderMotherComponent, { inputs: element });
describe('[Farming Suite - Animal Sheet] LossUnderMotherComponent', () => {
  it('should instantiate', async () => {
    expect((await renderLossUnderMotherComponent()).fixture.componentInstance).toBeTruthy();
  });

  it('should generate information cards based on informationCardItems', async () => {
    const { fixture } = await renderLossUnderMotherComponent();
    const informationCards = fixture.debugElement.queryAll(By.directive(InformationCardComponent));
    expect(informationCards.length).toBe(3);
  });

  describe('LossUnderMotherPercent', () => {
    it('should throw an error if LossUnderMotherPercent is not provided', async () => {
      await expect(renderLossUnderMotherComponent({})).rejects.toThrow('NG0950');
    });

    testForAvailableLanguages(({ setLanguageToTestedLocale }) => {
      it('should contains a translated text', async () => {
        const { fixture } = await renderLossUnderMotherComponent();
        setLanguageToTestedLocale(fixture);
        expect(fixture.debugElement.query(By.css('.chip')).nativeElement).toHaveTextContent('80%');
      });
    });
  });
});
