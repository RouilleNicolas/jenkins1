import frFR from "i18n/fr-FR.json";

export const frFRTestingTranslations = {
  ...frFR,
  forms: {
    ...frFR.forms,
    validation: {
      ...frFR.forms.validation,
      customRequiredMessage: 'Message requis personnalisé',
      customValidationMessage: 'Message de validation personnalisé',
    },
  },
  checkboxGroup: {
    master: {
      label: 'Label maître',
    },
    child: {
      label: 'Label enfant',
    }
  },
  'dynamic-forms': {
    genericLabel: 'Étiquette générique FR',
    genericPlaceholder: 'Placeholder générique FR',
    genericHint: 'Astuce générique FR',
    customErrorRequiredMessage: 'Message d\'erreur requis personnalisé',
    checkbox: {
      label: 'Choisissez-moi',
    },
    button: {
      label: 'Cliquez-moi',
    },
    tooltip: {
      content: 'Hé, je suis un tooltip',
    },
    labels: {
      foo: 'Foo FR',
    },
    radio: {
      label: 'Radio label FR',
      items: {
        'item-1': 'Option 1 FR',
        'item-2': 'Option 2 FR',
      }
    },
    select: {
      'hand-writing': {
        label: 'Écriture manuscrite',
        placeholder: 'Sélectionnez un style d\'écriture manuscrite',
        options: {
          left: 'Gauche',
          right: 'Droite',
        },
      },
      animals: {
        label: 'Animaux',
        options: {
          cat: 'Chat',
          dog: 'Chien',
          bird: 'Oiseau',
          lizard: 'Lézard',
        },
        groups: {
          mammals: 'Mammifères',
          oviparous: 'Ovipares',
        },
      }
    },
    'date-range-picker': {
      startPlaceholder: 'Date de début',
      endPlaceholder: 'Date de fin',
    }
  }
}

export default frFRTestingTranslations;
