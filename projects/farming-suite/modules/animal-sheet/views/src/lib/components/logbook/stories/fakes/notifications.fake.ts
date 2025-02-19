import { AnimalEventEnum, AnimalNotification } from '@cooperl/farming-suite/animal-sheet/domain';

export const fakeNotifications: AnimalNotification[] = [
  {
    eventType: AnimalEventEnum.NO_SLAUGHTERHOUSE,
    content: 'Abcès, boiterie',
    date: new Date(),
  },
  {
    eventType: AnimalEventEnum.OBSERVATION_CURRENT_CYCLE,
    content: 'Truie agressive',
    date: new Date(),
  },
  {
    eventType: AnimalEventEnum.OBSERVATION_CURRENT_CYCLE,
    content: 'Mise bas de nuit',
    date: new Date(),
  },
];
