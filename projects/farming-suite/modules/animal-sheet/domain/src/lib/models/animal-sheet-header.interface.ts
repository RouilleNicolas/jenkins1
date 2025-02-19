import { Id, Sex } from '@cooperl/utils';
import { Alert } from './alert.interface';

export interface AnimalSheetHeader {
  animal: {
    id: Id;
    sex: Sex;

    parity?: number;
    batch: {
      id: Id;
      name: string;
    };
    structure: {
      id: Id;
      name: string;
      case: {
        id: Id;
        name: string;
      };
    };
    physiologicalState: {
      i18nKey: string;
      startDate: Date;
    };
  };

  alerts: Alert[];
}
