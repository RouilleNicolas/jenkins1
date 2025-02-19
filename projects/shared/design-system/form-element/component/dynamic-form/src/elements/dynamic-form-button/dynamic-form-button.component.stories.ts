import { MatDividerModule } from '@angular/material/divider';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DynamicFormElementGenerators } from '../../stories/dynamic-form-element-generator';
import { DynamicFormButtonComponent } from './dynamic-form-button.component';
import { ButtonColor, ButtonStyle } from './form-item-button.interface';

const toTitleCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const defaultElement = DynamicFormElementGenerators.button({
  type: 'button',
  label: 'Postal Code',
  position: { x: 0, y: 0 },
  events: {},
});

const meta: Meta<DynamicFormButtonComponent> = {
  component: DynamicFormButtonComponent,
  title: 'Components/Dynamic Form/Button',
  decorators: [
    moduleMetadata({
      imports: [MatDividerModule],
    })
  ],
  render: (args) => {
    const buttonStyles: ButtonStyle[] = ['basic', 'raised', 'stroked', 'flat', 'icon', 'fab', 'mini-fab', 'fab-extended'];
    const buttonColors: ButtonColor[] = ['primary', 'accent', 'warn'];
    const props: Record<ButtonStyle, Record<ButtonColor, typeof args>> = buttonStyles.reduce((styleAcc, style) => {
      const sanitizedStyle = style.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) as ButtonStyle;
      const styleWithIcon: ButtonStyle[] = ['fab', 'mini-fab', 'fab-extended', 'icon'];

      styleAcc[sanitizedStyle] = buttonColors.reduce((colorAcc, color) => {
        colorAcc[color] = {
          element: {
            ...args.element,
            color: color,
            style: style,
            icon: styleWithIcon.includes(style) ? 'add' : '',
            tooltip: args.element.tooltip ? { ...args.element.tooltip, content: `${toTitleCase(style)} ${toTitleCase(color)} Button` } : undefined,
          }
        };
        return colorAcc;
      }, {} as Record<ButtonColor, typeof args>);

      return styleAcc;
    }, {} as Record<ButtonStyle, Record<ButtonColor, typeof args>>);

    const template = Object.entries(props).map(([style, colors]) => {
      const tpl = `<h3 style="margin-top: 8px">${toTitleCase(style)} Button</h3>`;
      return tpl + Object.entries(colors).map(([color]) => `
        <design-system-dynamic-form-button [element]="${style}.${color}.element" style="margin: 8px; display: inline-block" />
      `).join('');
    })
      .join('<mat-divider />\r\n');

    return {
      props: props,
      template: template,
    }
  },
};
export default meta;
type Story = StoryObj<DynamicFormButtonComponent>;

export const Default: Story = {
  args: {
    element: defaultElement
  },
};

export const Disabled: Story = {
  args: {
    element: DynamicFormElementGenerators.button({
      ...defaultElement,
      disabled: true,
    })
  }
};

export const WithTooltip: Story = {
  args: {
    element: DynamicFormElementGenerators.button({
      ...defaultElement,
      tooltip: {
        content: 'This is a tooltip',
        position: 'above',
        touchGesture: 'auto'
      },
    })
  }
};

export const Single: Story = {
  args: {
    element: DynamicFormElementGenerators.button({
      ...defaultElement,
      color: 'primary',
      style: 'basic'
    })
  },
  render: (args) => ({
    props: args,
    template: `<design-system-dynamic-form-button ${argsToTemplate(args)} />`,
  }),
};
