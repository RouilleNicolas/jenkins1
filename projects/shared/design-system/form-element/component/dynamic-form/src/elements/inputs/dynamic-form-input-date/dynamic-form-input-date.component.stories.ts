import { type Meta, type StoryObj } from '@storybook/angular';
import { sub } from 'date-fns';
import { DynamicFormElementGenerators } from '../../../stories/dynamic-form-element-generator';
import { DynamicFormInputDateComponent } from './dynamic-form-input-date.component';

const meta: Meta<DynamicFormInputDateComponent> = {
  component: DynamicFormInputDateComponent,
  title: 'Components/Dynamic Form/Input/Date/Simple',
};
export default meta;
type Story = StoryObj<DynamicFormInputDateComponent>;

const defaultElement = DynamicFormElementGenerators.input.date({
  type: 'input',
  label: 'Birthdate',
  placeholder: 'Type your birthdate...',
  position: { x: 0, y: 0 },
  date: {
    dateType: 'simple',
  },
  suffix: {
    icon: 'calendar_today',
  },
  events: {},
});
export const Default: Story = {
  args: {
    element: defaultElement
  },
};

export const WithValidation: Story = {
  args: {
    element: DynamicFormElementGenerators.input.date({
      ...defaultElement,
      field: {
        required: true,
        errorRequiredMessage: 'Your birthdate is required',
      },
      date: {
        dateType: 'simple',
        validation: {
          min: sub(new Date(), { years: 18 }).toISOString(),
        }
      }
    })
  },
};

export const WithPrefix: Story = {
  args: {
    element: DynamicFormElementGenerators.input.date({
      ...defaultElement,
      prefix: {
        icon: 'calendar_today',
      }
    })
  },
};

export const WithSuffix: Story = {
  args: {
    element: DynamicFormElementGenerators.input.date({
      ...defaultElement,
      suffix: {
        icon: 'calendar_today',
      }
    })
  },
};

export const WithHint: Story = {
  args: {
    element: DynamicFormElementGenerators.input.date({
      ...defaultElement,
      hint: {
        content: 'We need your birthdate to verify your age',
      }
    })
  },
};

export const WithClearable: Story = {
  args: {
    element: DynamicFormElementGenerators.input.date({
      ...defaultElement,
      defaultValue: new Date(),
      clearable: true,
    })
  },
};

export const WithDisabled: Story = {
  args: {
    element: DynamicFormElementGenerators.input.date({
      ...defaultElement,
      field: {
        disabled: true,
      }
    })
  },
};

export const WithDefaultValue: Story = {
  args: {
    element: DynamicFormElementGenerators.input.date({
      ...defaultElement,
      defaultValue: new Date(),
    })
  },
};

