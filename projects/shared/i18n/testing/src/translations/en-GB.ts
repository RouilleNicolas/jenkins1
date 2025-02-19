import enGB from "i18n/en-GB.json";

export const enGBTestingTranslations = {
  ...enGB,
  forms: {
    ...enGB.forms,
    validation: {
      ...enGB.forms.validation,
      customRequiredMessage: 'Custom required message',
      customValidationMessage: 'Custom validation message',
    },
  },
  checkboxGroup: {
    master: {
      label: 'Master label',
    },
    child: {
      label: 'Child label',
    }
  },
  'dynamic-forms': {
    genericLabel: 'Generic label EN',
    genericPlaceholder: 'Generic placeholder EN',
    genericHint: 'Generic hint EN',
    customErrorRequiredMessage: 'Custom error required message',
    checkbox: {
      label: 'Pick me',
    },
    button: {
      label: 'Click me',
    },
    tooltip: {
      content: 'Hey, I am a tooltip',
    },
    labels: {
      foo: 'Foo EN',
    },
    radio: {
      label: 'Radio label EN',
      items: {
        'item-1': 'Option 1 EN',
        'item-2': 'Option 2 EN',
      }
    },
    select: {
      'hand-writing': {
        label: 'Hand writing',
        placeholder: 'Select a hand writing style',
        options: {
          left: 'Left',
          right: 'Right',
        }
      },
      animals: {
        label: 'Animals',
        options: {
          cat: 'Cat',
          dog: 'Dog',
          bird: 'Bird',
          lizard: 'Lizard',
        },
        groups: {
          mammals: 'Mammals',
          oviparous: 'Oviparous',
        }
      }
    },
    'date-range-picker': {
      startPlaceholder: 'Start date',
      endPlaceholder: 'End date',
    }
  }
}

export default enGBTestingTranslations;
