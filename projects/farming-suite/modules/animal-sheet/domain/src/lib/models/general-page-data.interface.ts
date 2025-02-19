import { Id, Sex } from '@cooperl/utils';
import { AnimalEventEnum } from './events/animal-event.enum';
import { AnimalEvent } from './events/animal-event.type';
import { EntranceEvent, FarrowingEvent, InseminationEvent } from './events/interfaces';

export interface GeneralPageData {
  informations: {
    nationalNumber: string;
    rfid: string;
    sex: Sex;
    birthDate: Date;
  };
  // stats: {
  //   performances: {},
  //   losses: {},
  // };
  reproductions: {
    entrance: EntranceEvent;
    firstArtificialInsemination: Pick<InseminationEvent, 'boar' | 'date'>;
    firstFarrowing: FarrowingEvent;
  };
  currentCycle: {
    parity: number;
    events: AnimalEvent[];
    boar: {
      name: string;
      // Not sure about this property
      id: Id;
    };
    startDate: Date;
    previsions: {
      event: AnimalEventEnum;
      done: boolean;
      date: Date;
    }[];
  };
}
