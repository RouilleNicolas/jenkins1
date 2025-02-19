import { renderElement } from '@cooperl/design-system/testing';
import { ComponentInput } from '@testing-library/angular';
import { InformationCardComponent } from './information-card.component';

const defaultInputs: ComponentInput<InformationCardComponent> = {
  value: 1.5,
  subtitle: 'This is subtitle',
  suffix: 'This is suffix',
};

const renderInformationCardComponent = (element = defaultInputs) => renderElement(InformationCardComponent, { inputs: element });

describe('[Farming Suite - Animal Sheet] InformationCardComponent', () => {
  it('should create the component', async () => {
    expect((await renderInformationCardComponent()).fixture.componentInstance).toBeTruthy();
  });

  describe('Subtitle', () => {
    it('should throw an error if subtitle is not provided', async () => [
      await expect(renderInformationCardComponent({ value: 1.5 })).rejects.toThrow('NG0950'),
    ]);

    it('should render the subtitle', async () => {
      expect((await renderInformationCardComponent()).getByText('This is subtitle')).toBeVisible();
    });
  });

  describe('Value', () => {
    it('should throw an error if value is not provided', async () => [
      await expect(renderInformationCardComponent({ subtitle: 'This is subtitle' })).rejects.toThrow('NG0950'),
    ]);

    it('should render the value', async () => {
      expect((await renderInformationCardComponent()).getByText('1.5')).toBeVisible();
    });
  });

  describe('Suffix', () => {
    it('should render the suffix', async () => {
      expect((await renderInformationCardComponent()).getByText('This is suffix')).toBeVisible();
    });
  });
});
