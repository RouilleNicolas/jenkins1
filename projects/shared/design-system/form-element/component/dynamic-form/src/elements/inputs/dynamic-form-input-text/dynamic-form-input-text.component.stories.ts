import { type Meta, type StoryObj } from '@storybook/angular';
import { DynamicFormElementGenerators } from '../../../stories/dynamic-form-element-generator';
import { DynamicFormInputTextComponent } from './dynamic-form-input-text.component';

const meta: Meta<DynamicFormInputTextComponent> = {
  component: DynamicFormInputTextComponent,
  title: 'Components/Dynamic Form/Input/Text',
};
export default meta;
type Story = StoryObj<DynamicFormInputTextComponent>;

const defaultElement = DynamicFormElementGenerators.input.text({
  type: 'input',
  inputType: 'text',
  label: 'Postal Code',
  placeholder: 'Type your postal code...',
  position: { x: 0, y: 0 },
  events: {},
});
export const Default: Story = {
  args: {
    element: defaultElement
  },
};

export const WithValidation: Story = {
  args: {
    element: DynamicFormElementGenerators.input.text({
      ...defaultElement,
      field: {
        required: true,
        errorRequiredMessage: 'Postal code is required',
      },
      validation: {
        regex: '^[0-9]{5}$',
        errorValidationMessage: 'Invalid postal code format',
      },
      text: {
        validation: {
          size: 5
        }
      }
    })
  },
};

export const WithPrefix: Story = {
  args: {
    element: DynamicFormElementGenerators.input.text({
      ...defaultElement,
      prefix: {
        icon: 'location_city',
      }
    })
  },
};

export const WithSuffix: Story = {
  args: {
    element: DynamicFormElementGenerators.input.text({
      ...defaultElement,
      suffix: {
        icon: 'location_city',
      }
    })
  },
};

export const WithHint: Story = {
  args: {
    element: DynamicFormElementGenerators.input.text({
      ...defaultElement,
      hint: {
        content: 'Type your postal code',
      }
    })
  },
};

export const WithClearable: Story = {
  args: {
    element: DynamicFormElementGenerators.input.text({
      ...defaultElement,
      defaultValue: '12345',
      clearable: true,
    })
  },
};

export const WithDisabled: Story = {
  args: {
    element: DynamicFormElementGenerators.input.text({
      ...defaultElement,
      field: {
        disabled: true,
      }
    })
  },
};

export const WithDefaultValue: Story = {
  args: {
    element: DynamicFormElementGenerators.input.text({
      ...defaultElement,
      defaultValue: '12345',
    })
  },
};

