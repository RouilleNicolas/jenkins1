import { FormItemInputDate } from "../dynamic-form-input-date/form-item-input-date.interface";
import { DateRange } from "./date-range.interface";

export interface FormItemInputDateRange
  extends FormItemInputDate<'range', DateRange> {
  date: FormItemInputDate<'range'>['date'] & {
    range?: {
      startPlaceholder?: string;
      endPlaceholder?: string;
    };
  };
}
