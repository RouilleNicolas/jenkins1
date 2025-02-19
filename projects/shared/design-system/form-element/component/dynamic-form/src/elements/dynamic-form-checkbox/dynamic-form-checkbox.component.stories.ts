import { type Meta, type StoryObj } from '@storybook/angular';
import { defaultTooltipPosition, defaultTooltipTouchGesture } from '../../interfaces/elements/tooltip/tooltip.interface';
import { DynamicFormElementGenerators } from '../../stories/dynamic-form-element-generator';
import { DynamicFormCheckboxComponent } from './dynamic-form-checkbox.component';

const meta: Meta<DynamicFormCheckboxComponent> = {
  component: DynamicFormCheckboxComponent,
  title: 'Components/Dynamic Form/Checkbox',
};
export default meta;
type Story = StoryObj<DynamicFormCheckboxComponent>;

const defaultElement = DynamicFormElementGenerators.checkbox({
  type: 'checkbox',
  label: 'Agree to terms and conditions',
  position: { x: 0, y: 0 },
  events: {},
});
export const Default: Story = {
  args: {
    element: defaultElement
  },
};

export const WithLabelPosition: Story = {
  args: {
    element: DynamicFormElementGenerators.checkbox({
      ...defaultElement,
      labelPosition: 'before',
    })
  },
};

export const WithValidation: Story = {
  args: {
    element: DynamicFormElementGenerators.checkbox({
      ...defaultElement,
      field: {
        required: true,
        errorRequiredMessage: 'Postal code is required',
      },
    })
  },
};

export const WithDisabled: Story = {
  args: {
    element: DynamicFormElementGenerators.checkbox({
      ...defaultElement,
      field: {
        disabled: true,
      }
    })
  },
};

export const WithDefaultValue: Story = {
  args: {
    element: DynamicFormElementGenerators.checkbox({
      ...defaultElement,
      defaultValue: true,
    })
  },
};

export const WithIndeterminate: Story = {
  args: {
    element: DynamicFormElementGenerators.checkbox({
      ...defaultElement,
      indeterminate: true,
    })
  },
};

export const WithTooltip: Story = {
  args: {
    element: DynamicFormElementGenerators.checkbox({
      ...defaultElement,
      tooltip: {
        content: 'Agree to terms and conditions',
        position: defaultTooltipPosition,
        touchGesture: defaultTooltipTouchGesture
      },
    })
  },
};
