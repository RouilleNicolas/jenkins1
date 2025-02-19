import { Component, input } from '@angular/core';
import { Backgrounds } from '@cooperl/design-system/testing';
import { type Meta, type StoryObj } from '@storybook/angular';
import { ToggleButtonItemComponent } from './toggle-button-item.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- Don't care in story
  selector: 'sb-toggle-button-item-wrapper',
  imports: [
    // Angular
    // External
    // Internal
    ToggleButtonItemComponent,
  ],
  template: `<design-system-toggle-button-item [selected]="selected()" testId="toggle-button-item">Général</design-system-toggle-button-item>`,
  host: {
    '[style.--toggle-button-item-bg]': 'bgColor()',
    '[style.--toggle-button-item-color]': 'color()',
    '[style.--toggle-button-item-bg-hover]': 'bgHoverColor()',
    '[style.--toggle-button-item-bg-active]': 'bgActiveColor()',
    '[style.--toggle-button-item-color-active]': 'activeColor()',
    '[style.--toggle-button-item-color-hover]': 'hoverColor()',
    '[style.--toggle-button-item-selected-bg]': 'selectedBgColor()',
    '[style.--toggle-button-item-selected-color]': 'selectedColor()',
    '[style.--toggle-button-item-selected-color-hover]': 'selectedHoverColor()',
  },
})
class WrapperComponent {
  public readonly selected = input<boolean>();

  public readonly bgColor = input<string>();
  public readonly color = input<string>();
  public readonly bgHoverColor = input<string>();
  public readonly bgActiveColor = input<string>();
  public readonly activeColor = input<string>();
  public readonly hoverColor = input<string>();
  public readonly selectedBgColor = input<string>();
  public readonly selectedColor = input<string>();
  public readonly selectedHoverColor = input<string>();
}

const meta: Meta<WrapperComponent> = {
  component: WrapperComponent,
  title: 'Components/Toggle Button/Item',
  args: {
    bgColor: '#124649',
    color: '#ffffff',
    bgHoverColor: '#295456',
    bgActiveColor: '#012f32',
    activeColor: '#faffd8',
    hoverColor: '#faffd8',
    selectedBgColor: '#faffd8',
    selectedColor: '#012f32',
    selectedHoverColor: '#295456',
  },
};
export default meta;
type Story = StoryObj<WrapperComponent>;

export const Active: Story = {
  args: {
    selected: true,
  },
  parameters: {
    backgrounds: {
      default: Backgrounds.Header,
    },
  },
};

export const Inactive: Story = {
  args: {
    selected: false,
  },
};
