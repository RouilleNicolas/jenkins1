import { AnimalEventBase } from '../animal-event-base.interface';

export interface UltrasoundEvent extends AnimalEventBase {
  result: boolean;
}
