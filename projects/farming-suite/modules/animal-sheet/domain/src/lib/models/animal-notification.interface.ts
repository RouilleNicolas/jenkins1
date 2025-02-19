import { AnimalEventEnum } from './events/animal-event.enum';

export interface AnimalNotification {
  content: string;
  date: Date;
  eventType: AnimalEventEnum;
}
