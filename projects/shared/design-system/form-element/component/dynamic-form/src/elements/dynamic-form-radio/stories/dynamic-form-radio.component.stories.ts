import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FetchActions } from '../../../interfaces/elements/fetch-actions.type';
import { provideFetchActionsProvider } from '../../../interfaces/fetch-action.provider';
import { DynamicFormElementGenerators } from '../../../stories/dynamic-form-element-generator';
import { DynamicFormRadioComponent } from '../dynamic-form-radio.component';
import { DynamicFormRadioStoryService } from './dynamic-form-radio-story.service';

const meta: Meta<DynamicFormRadioComponent> = {
  component: DynamicFormRadioComponent,
  title: 'Components/Dynamic Form/Radio Buttons',
  decorators: [
    moduleMetadata({
      providers: [
        provideFetchActionsProvider(DynamicFormRadioStoryService),
      ]
    })
  ],
};
export default meta;
type Story = StoryObj<DynamicFormRadioComponent>;

const defaultElement = DynamicFormElementGenerators.radio({
  type: 'radio',
  label: 'Hand Writing',
  position: { x: 0, y: 0 },
  events: {},
  options: {
    items: {
      left: {
        label: 'Left',
        value: 'left',
        events: {},
      },
      right: {
        label: 'Right',
        value: 'right',
        events: {},
      },
    }
  }
});
export const Default: Story = {
  args: {
    element: defaultElement
  },
};

const formControl = new FormControl('');
formControl.markAsTouched();
export const WithValidation: Story = {
  args: {
    element: DynamicFormElementGenerators.radio({
      ...defaultElement,
      field: {
        required: true,
        errorRequiredMessage: 'Hand writing is required',
      },
    })
  },
  render: (args) => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule]
    },
    props: {
      ...args,
      formControl
    },
    template: `
  <design-system-dynamic-form-radio ${argsToTemplate(args)} [formControl]="formControl" />
  `
  })
};

export const WithDisabled: Story = {
  args: {
    element: DynamicFormElementGenerators.radio({
      ...defaultElement,
      field: {
        disabled: true,
      }
    })
  },
};

export const WithDisabledOption: Story = {
  args: {
    element: DynamicFormElementGenerators.radio({
      ...defaultElement,
      options: {
        items: {
          ...defaultElement.options.items,
          disabled: {
            label: 'Disabled',
            value: 'disabled',
            disabled: true,
            events: {},
          }
        }
      }
    })
  }
};

const elementWithDefaultValue = DynamicFormElementGenerators.radio({
  ...defaultElement,
  options: {
    ...defaultElement.options,
    items: {
      ...defaultElement.options.items,
      right: {
        ...(defaultElement.options.items ?? {})['right'],
        default: true,
      }
    }
  }
});
export const WithDefaultValue: Story = {
  args: {
    element: elementWithDefaultValue
  },
};

export const WithLabelPosition: Story = {
  args: {
    element: DynamicFormElementGenerators.radio({
      ...defaultElement,
      options: {
        items: {
          left: {
            label: 'Left',
            value: 'left',
            labelPosition: 'before',
            events: {},
          },
          right: {
            label: 'Right',
            value: 'right',
            labelPosition: 'after',
            events: {},
          },
        }
      }
    })
  }
}

export const WithFetchAction: Story = {
  args: {
    element: DynamicFormElementGenerators.radio({
      ...defaultElement,
      options: {
        optionAction: 'fetchHandWriting' as FetchActions,
      },
    })
  }
};
