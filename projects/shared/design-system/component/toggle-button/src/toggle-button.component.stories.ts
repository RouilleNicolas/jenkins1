import { Component, input } from '@angular/core';
import { type Meta, type StoryObj } from '@storybook/angular';
import { ToggleButtonItemComponent } from './item/toggle-button-item.component';
import { ToggleButtonComponent } from './toggle-button.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- Don't care in story
  selector: 'sb-toggle-button-wrapper',
  imports: [
    // Angular
    // External
    // Internal
    ToggleButtonComponent,
    ToggleButtonItemComponent,
  ],
  template: `
    <design-system-toggle-button>
      <design-system-toggle-button-item selected testId="general">Général</design-system-toggle-button-item>
      <design-system-toggle-button-item testId="career">Carrière</design-system-toggle-button-item>
    </design-system-toggle-button>
  `,
  host: {
    '[style.--toggle-button-bg]': 'bgColor()',

    '[style.--toggle-button-item-bg]': 'itemBgColor()',
    '[style.--toggle-button-item-color]': 'itemColor()',
    '[style.--toggle-button-item-bg-hover]': 'itemBgHoverColor()',
    '[style.--toggle-button-item-bg-active]': 'itemBgActiveColor()',
    '[style.--toggle-button-item-color-active]': 'itemActiveColor()',
    '[style.--toggle-button-item-color-hover]': 'itemHoverColor()',
    '[style.--toggle-button-item-selected-bg]': 'itemSelectedBgColor()',
    '[style.--toggle-button-item-selected-color]': 'itemSelectedColor()',
    '[style.--toggle-button-item-selected-color-hover]': 'itemSelectedHoverColor()',
  },
})
class WrapperComponent {
  public readonly bgColor = input<string>();

  public readonly itemBgColor = input<string>();
  public readonly itemColor = input<string>();
  public readonly itemBgHoverColor = input<string>();
  public readonly itemBgActiveColor = input<string>();
  public readonly itemActiveColor = input<string>();
  public readonly itemHoverColor = input<string>();
  public readonly itemSelectedBgColor = input<string>();
  public readonly itemSelectedColor = input<string>();
  public readonly itemSelectedHoverColor = input<string>();
}

const meta: Meta<WrapperComponent> = {
  component: WrapperComponent,
  title: 'Components/Toggle Button/Wrapper',
  args: {
    bgColor: '#124649',

    itemBgColor: '#124649',
    itemColor: '#ffffff',
    itemBgHoverColor: '#295456',
    itemBgActiveColor: '#012f32',
    itemActiveColor: '#faffd8',
    itemHoverColor: '#faffd8',
    itemSelectedBgColor: '#faffd8',
    itemSelectedColor: '#012f32',
    itemSelectedHoverColor: '#295456',
  },
  argTypes: {
    bgColor: {
      control: 'color',
    },
  },
};
export default meta;
type Story = StoryObj<WrapperComponent>;

export const Primary: Story = {
  args: {},
};
