import { Id } from '@cooperl/utils';
import { AnimalEventEnum, AnimalNotification } from '../../models';

export const InMemoryNotificationsDataFake: Record<Id, AnimalNotification[]> = {
  1: [
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
  ],
};
