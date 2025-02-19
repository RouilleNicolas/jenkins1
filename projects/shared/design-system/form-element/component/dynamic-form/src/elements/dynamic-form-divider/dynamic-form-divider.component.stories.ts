import { type Meta, type StoryObj } from '@storybook/angular';
import { DynamicFormElementGenerators } from '../../stories/dynamic-form-element-generator';
import { DynamicFormInputTextComponent } from '../inputs/dynamic-form-input-text/dynamic-form-input-text.component';
import { DynamicFormDividerComponent } from './dynamic-form-divider.component';

const defaultElement = DynamicFormElementGenerators.divider({
  type: 'divider',
  position: { x: 0, y: 0 },
});

const defaultRender: Meta<DynamicFormDividerComponent>['render'] = (args) => ({
  props: {
    divider: args,
    input: {
      element: DynamicFormElementGenerators.input.text({
        type: 'input',
        inputType: 'text',
        label: "Text",
        position: { x: 0, y: 0 },
        events: {},
      })
    }
  },
  moduleMetadata: {
    imports: [DynamicFormInputTextComponent]
  },
  styles: [
    ":host { display: flex; gap: 16px; flex-direction: column; }",
  ],
  template: `
<design-system-dynamic-form-input-text [element]="input.element" />
<design-system-dynamic-form-divider [element]="divider.element" />
<design-system-dynamic-form-input-text [element]="input.element" />
`
});


const meta: Meta<DynamicFormDividerComponent> = {
  component: DynamicFormDividerComponent,
  title: 'Components/Dynamic Form/Divider',
  render: defaultRender
};
export default meta;
type Story = StoryObj<DynamicFormDividerComponent>;

export const Default: Story = {
  args: {
    element: defaultElement
  },
};

export const WithVerticalDisplay: Story = {
  args: {
    element: DynamicFormElementGenerators.divider({
      ...defaultElement,
      vertical: true
    })
  },
  render: (args, context) => ({
    ...defaultRender(args, context),
    styles: [
      ":host { display: flex; gap: 16px; flex-direction: row; }",
    ]
  })
};

export const WithInset: Story = {
  args: {
    element: DynamicFormElementGenerators.divider({
      ...defaultElement,
      inset: true
    })
  }
};

