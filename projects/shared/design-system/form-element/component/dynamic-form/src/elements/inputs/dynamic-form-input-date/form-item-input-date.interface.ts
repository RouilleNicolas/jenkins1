import { FormItemInput } from "../form-item-input.interface";

export type DateType = 'simple' | 'multiple' | 'range';
export type StartView = 'month' | 'year' | 'multi-year';

export interface FormItemInputDate<TDateType extends DateType = 'simple' | 'multiple', TDefaultValue = Date>
  extends FormItemInput<TDefaultValue> {
  date: {
    dateType?: TDateType;
    dateFilterAction?: string;
    dateClassAction?: string;
    inline?: boolean;
    startAt?: string;
    startView?: StartView;
    validation?: {
      min?: string;
      max?: string;
      minWarning?: string;
      maxWarning?: string;
      warningMessage?: string;
    };
  };
}

export const defaultDateStartView: StartView = 'month';
export const defaultDateType = 'simple';
