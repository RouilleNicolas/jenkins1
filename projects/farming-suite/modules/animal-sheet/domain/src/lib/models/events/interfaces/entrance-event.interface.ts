import { AnimalEventBase } from '../animal-event-base.interface';

export interface EntranceEvent extends AnimalEventBase {
  originSite: string;
  entranceSite: string;
  entranceParity: number;
}
