import { Id, Sex } from '@cooperl/utils';
import { AnimalSheetHeader } from '../../models';

export const InMemoryHeaderDataFake: Record<Id, AnimalSheetHeader> = {
  1: {
    animal: {
      id: 1,
      sex: Sex.Female,

      parity: 5,
      batch: {
        id: 'b2.21',
        name: 'B2.21',
      },
      structure: {
        id: 1,
        name: 'Gestation n°1',
        case: {
          id: 3,
          name: 'case 3',
        },
      },
      physiologicalState: {
        i18nKey: 'lactation',
        startDate: new Date('2023-11-21'),
      },
    },

    alerts: [
      { title: 'Aiguille cassée', updateDate: new Date('2024-12-12') },
      { title: "Délais d'attente : 5 jours", updateDate: new Date('2024-12-12') },
    ],
  },
  2: {
    animal: {
      id: 2,
      sex: Sex.Male,

      parity: undefined,
      batch: {
        id: 'b3.42',
        name: 'B3.42',
      },
      structure: {
        id: 8,
        name: 'Verraterie',
        case: {
          id: 3,
          name: 'case 3',
        },
      },
      physiologicalState: {
        i18nKey: 'fattening',
        startDate: new Date('2024-10-05'),
      },
    },

    alerts: [],
  },
};
