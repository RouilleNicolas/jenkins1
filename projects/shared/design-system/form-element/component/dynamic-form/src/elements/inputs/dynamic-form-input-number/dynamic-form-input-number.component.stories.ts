import { type Meta, type StoryObj } from '@storybook/angular';
import { DynamicFormElementGenerators } from '../../../stories/dynamic-form-element-generator';
import { DynamicFormInputNumberComponent } from './dynamic-form-input-number.component';

const meta: Meta<DynamicFormInputNumberComponent> = {
  component: DynamicFormInputNumberComponent,
  title: 'Components/Dynamic Form/Input/Number',
};
export default meta;
type Story = StoryObj<DynamicFormInputNumberComponent>;

const defaultElement = DynamicFormElementGenerators.input.number({
  type: 'input',
  label: 'Number',
  placeholder: 'Type a number...',
  position: { x: 0, y: 0 },
  number: {},
  events: {},
});
export const Default: Story = {
  args: {
    element: defaultElement
  },
};

export const WithValidation: Story = {
  args: {
    element: DynamicFormElementGenerators.input.number({
      ...defaultElement,
      field: {
        required: true,
        errorRequiredMessage: 'Number is required',
      },
      number: {
        validation: {
          min: 2,
          max: 10,
        }
      }
    })
  },
};

export const WithPrefix: Story = {
  args: {
    element: DynamicFormElementGenerators.input.number({
      ...defaultElement,
      prefix: {
        icon: 'tag',
      }
    })
  },
};

export const WithSuffix: Story = {
  args: {
    element: DynamicFormElementGenerators.input.number({
      ...defaultElement,
      suffix: {
        icon: 'tag',
      }
    })
  },
};

export const WithHint: Story = {
  args: {
    element: DynamicFormElementGenerators.input.number({
      ...defaultElement,
      hint: {
        content: 'Type any number between 2 and 10',
      }
    })
  },
};

export const WithClearable: Story = {
  args: {
    element: DynamicFormElementGenerators.input.number({
      ...defaultElement,
      defaultValue: 5,
      clearable: true,
    })
  },
};

export const WithDisabled: Story = {
  args: {
    element: DynamicFormElementGenerators.input.number({
      ...defaultElement,
      field: {
        disabled: true,
      }
    })
  },
};

export const WithDefaultValue: Story = {
  args: {
    element: DynamicFormElementGenerators.input.number({
      ...defaultElement,
      defaultValue: 5,
    })
  },
};

