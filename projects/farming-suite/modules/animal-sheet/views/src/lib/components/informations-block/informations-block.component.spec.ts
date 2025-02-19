import { renderElement } from '@cooperl/design-system/testing';
import { ComponentInput } from '@testing-library/angular';
import { InformationsBlockComponent } from './informations-block.component';

const defaultInformationBlock: ComponentInput<InformationsBlockComponent> = {
  title: 'This is title',
  value: 15.5,
};

const renderInformationBlock = (element = defaultInformationBlock) => renderElement(InformationsBlockComponent, { inputs: element });

describe('[Farming Suite - Animal Sheet] InformationsBlockComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderInformationBlock();
    expect(fixture.componentInstance).toBeInstanceOf(InformationsBlockComponent);
  });

  describe('Title', () => {
    it('should throw an error if title is not provided', async () => {
      await expect(renderInformationBlock({ value: 15.5 })).rejects.toThrow('NG0950');
    });

    it('show title when is set', async () => {
      const { getByText } = await renderInformationBlock();
      expect(getByText('This is title')).toBeVisible();
    });
  });

  describe('Value', () => {
    it('should throw an error if value is not provided', async () => {
      await expect(renderInformationBlock({ title: 'This is title' } as ComponentInput<InformationsBlockComponent>)).rejects.toThrow('NG0950');
    });
  });

  describe('Suffix', () => {
    it('show suffix when is set', async () => {
      const { getByText } = await renderInformationBlock({
        ...defaultInformationBlock,
        suffix: 'This is suffix',
      } as ComponentInput<InformationsBlockComponent>);
      expect(getByText('This is suffix')).toBeVisible();
    });
  });

  describe('isPercentValue', () => {
    it('show percent sign when is set', async () => {
      const { getByText } = await renderInformationBlock({
        ...defaultInformationBlock,
        isPercentValue: true,
      } as ComponentInput<InformationsBlockComponent>);
      expect(getByText('%')).toBeVisible();
    });
  });
});
