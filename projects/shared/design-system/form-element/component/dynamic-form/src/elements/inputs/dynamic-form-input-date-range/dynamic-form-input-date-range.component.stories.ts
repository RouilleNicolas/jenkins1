import { type Meta, type StoryObj } from '@storybook/angular';
import { add } from 'date-fns';
import { DynamicFormElementGenerators } from '../../../stories/dynamic-form-element-generator';
import { DynamicFormInputDateRangeComponent } from './dynamic-form-input-date-range.component';

const meta: Meta<DynamicFormInputDateRangeComponent> = {
  component: DynamicFormInputDateRangeComponent,
  title: 'Components/Dynamic Form/Input/Date/Range',
};
export default meta;
type Story = StoryObj<DynamicFormInputDateRangeComponent>;

const defaultElement = DynamicFormElementGenerators.input.dateRange({
  type: 'input',
  label: 'Event Date Range',
  placeholder: 'Type the event date range...',
  position: { x: 0, y: 0 },
  suffix: {
    icon: 'calendar_today',
  },
  date: {
    dateType: 'range',
    range: {
      startPlaceholder: 'Start Date',
      endPlaceholder: 'End Date',
    }
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
    element: DynamicFormElementGenerators.input.dateRange({
      ...defaultElement,
      field: {
        required: true,
        errorRequiredMessage: 'Event date range is required',
      },
      date: {
        dateType: 'range',
        validation: {
          min: (new Date()).toISOString(),
          max: add(new Date(), { days: 10 }).toISOString(),
        }
      }
    })
  },
};

export const WithPrefix: Story = {
  args: {
    element: DynamicFormElementGenerators.input.dateRange({
      ...defaultElement,
      prefix: {
        icon: 'calendar_today',
      }
    })
  },
};

export const WithSuffix: Story = {
  args: {
    element: DynamicFormElementGenerators.input.dateRange({
      ...defaultElement,
      suffix: {
        icon: 'calendar_today',
      }
    })
  },
};

export const WithHint: Story = {
  args: {
    element: DynamicFormElementGenerators.input.dateRange({
      ...defaultElement,
      hint: {
        content: 'Type any number between 2 and 10',
      }
    })
  },
};

export const WithClearable: Story = {
  args: {
    element: DynamicFormElementGenerators.input.dateRange({
      ...defaultElement,
      defaultValue: {
        start: new Date().toISOString(),
        end: add(new Date(), { days: 5 }).toISOString()
      },
      clearable: true,
    })
  },
};

export const WithDisabled: Story = {
  args: {
    element: DynamicFormElementGenerators.input.dateRange({
      ...defaultElement,
      field: {
        disabled: true,
      }
    })
  },
};

export const WithDefaultValue: Story = {
  args: {
    element: DynamicFormElementGenerators.input.dateRange({
      ...defaultElement,
      defaultValue: {
        start: new Date().toISOString(),
        end: add(new Date(), { days: 5 }).toISOString()
      },
    })
  },
};

