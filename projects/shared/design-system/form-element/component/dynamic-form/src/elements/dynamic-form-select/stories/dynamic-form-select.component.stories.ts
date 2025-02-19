import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FetchActions } from '../../../interfaces/elements/fetch-actions.type';
import { provideFetchActionsProvider } from '../../../interfaces/fetch-action.provider';
import { DynamicFormElementGenerators } from '../../../stories/dynamic-form-element-generator';
import { DynamicFormSelectComponent } from '../dynamic-form-select.component';
import { OptionsSelect } from '../options-select.interface';
import { DynamicFormSelectStoryService } from './dynamic-form-select-story.service';

const meta: Meta<DynamicFormSelectComponent> = {
  component: DynamicFormSelectComponent,
  title: 'Components/Dynamic Form/Select',
  decorators: [
    moduleMetadata({
      providers: [
        provideFetchActionsProvider(DynamicFormSelectStoryService),
      ]
    })
  ],
};
export default meta;
type Story = StoryObj<DynamicFormSelectComponent>;

const defaultElement = DynamicFormElementGenerators.select({
  type: 'select',
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

export const WithValidation: Story = {
  args: {
    element: DynamicFormElementGenerators.select({
      ...defaultElement,
      field: {
        required: true,
        errorRequiredMessage: 'Hand writing is required',
      },
    })
  },
};

export const WithDisabled: Story = {
  args: {
    element: DynamicFormElementGenerators.select({
      ...defaultElement,
      field: {
        disabled: true,
      }
    })
  },
};

export const WithDisabledOption: Story = {
  args: {
    element: DynamicFormElementGenerators.select({
      ...defaultElement,
      options: {
        items: {
          ...defaultElement.options.items,
          right: {
            ...(defaultElement.options.items ?? {})['right'],
            disabled: true,
          }
        }
      }
    })
  },
};

const elementWithDefaultValue = DynamicFormElementGenerators.select({
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

export const WithClearable: Story = {
  args: {
    element: DynamicFormElementGenerators.select({
      ...elementWithDefaultValue,
      clearable: true
    })
  }
};

export const WithOutlineAppearance: Story = {
  args: {
    element: DynamicFormElementGenerators.select({
      ...defaultElement,
      field: {
        appearance: 'outline',
      }
    })
  }
}

export const WithLabelAlwaysFloating: Story = {
  args: {
    element: DynamicFormElementGenerators.select({
      ...defaultElement,
      field: {
        floatLabel: 'always',
      }
    })
  }
}

const groups: OptionsSelect['groups'] = {
  mammals: { label: 'Mammals' },
  oviparous: { label: 'Oviparous' },
}
const defaultElementWithGroup = DynamicFormElementGenerators.select({
  ...defaultElement,
  label: 'Animals',
  options: {
    groups,
    items: {
      cat: {
        label: 'Cat',
        value: 'cat',
        group: 'mammals',
        events: {},
      },
      dog: {
        label: 'Dog',
        value: 'dog',
        group: 'mammals',
        events: {},
      },
      chicken: {
        label: 'Chicken',
        value: 'chicken',
        group: 'oviparous',
        events: {},
      },
      duck: {
        label: 'Duck',
        value: 'duck',
        group: 'oviparous',
        events: {},
      },
    }
  }
});
export const WithGrouping: Story = {
  args: {
    element: DynamicFormElementGenerators.select({
      ...defaultElementWithGroup,
    })
  }
}

export const WithDisabledGroup: Story = {
  args: {
    element: DynamicFormElementGenerators.select({
      ...defaultElementWithGroup,
      options: {
        ...defaultElementWithGroup.options,
        groups: {
          ...groups,
          mammals: {
            ...groups['mammals'],
            disabled: true,
          }
        },
      }
    })
  }
}

export const WithDisabledOptionInGroup: Story = {
  args: {
    element: DynamicFormElementGenerators.select({
      ...defaultElementWithGroup,
      options: {
        ...defaultElementWithGroup.options,
        items: {
          ...defaultElementWithGroup.options.items,
          dog: {
            ...(defaultElementWithGroup.options.items ?? {})['dog'],
            disabled: true,
          }
        }
      },
    })
  }
}

export const WithHiddenSingleSelectionIndicator: Story = {
  args: {
    element: DynamicFormElementGenerators.select({
      ...elementWithDefaultValue,
      hideSingleSelectionIndicator: true,
    })
  }
}

export const WithMultipleSelection: Story = {
  args: {
    element: DynamicFormElementGenerators.select({
      ...defaultElement,
      multiple: true,
    })
  }
}

export const WithMultipleSelectionAndDefaultValue: Story = {
  args: {
    element: DynamicFormElementGenerators.select({
      ...elementWithDefaultValue,
      options: {
        items: {
          ...defaultElement.options.items,
          right: {
            ...(defaultElement.options.items ?? {})['right'],
            default: true,
          },
          left: {
            ...(defaultElement.options.items ?? {})['left'],
            default: true,
          }
        },
      },
      multiple: true,
    })
  }
}

export const WithChipAppearance: Story = {
  args: {
    element: DynamicFormElementGenerators.select({
      ...defaultElement,
      multiple: true,
      multipleChip: true,
    })
  }
}

export const WithFetchAction: Story = {
  args: {
    element: DynamicFormElementGenerators.select({
      ...defaultElement,
      options: {
        optionAction: 'fetchHandWriting' as FetchActions,
      },
    })
  }
};
