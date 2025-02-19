import { AnimalEventBase } from '../animal-event-base.interface';

export interface FarrowingEvent extends AnimalEventBase {
  pigletCount: number;
}
