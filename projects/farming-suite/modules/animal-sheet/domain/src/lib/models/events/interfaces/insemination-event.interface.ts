import { AnimalEventBase } from '../animal-event-base.interface';

export interface InseminationEvent extends AnimalEventBase {
  batch: {
    id: string;
    name: string;
  };
  boar: {
    nationalNumber: string;
    name: string;
  };
  doseCount: number;
  isNatural: boolean;
  isFertile: boolean;
}
