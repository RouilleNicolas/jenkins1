import { FormItemInputDateRange } from "../elements/inputs/dynamic-form-input-date-range/form-item-input-date-range.interface";
import { FormItemInputDate } from "../elements/inputs/dynamic-form-input-date/form-item-input-date.interface";
import { FormItemInput, InputType } from "../elements/inputs/form-item-input.interface";

const inputsTypeDate: InputType[] = ['date', 'datetime-local', 'month', 'time', 'week'];
export const isFormItemInputDateRange = (value: FormItemInput): value is FormItemInputDate =>
  value.type === 'input' && !!value.inputType && inputsTypeDate.includes(value.inputType) && (value as FormItemInputDateRange).date?.dateType === 'range';
