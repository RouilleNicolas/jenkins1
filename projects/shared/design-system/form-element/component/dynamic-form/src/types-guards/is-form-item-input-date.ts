import { defaultDateType, FormItemInputDate } from "../elements/inputs/dynamic-form-input-date/form-item-input-date.interface";
import { FormItemInput, InputType } from "../elements/inputs/form-item-input.interface";

const simpleDateTypes: FormItemInputDate['date']['dateType'][] = ['simple', 'multiple'];
const inputsTypeDate: InputType[] = ['date', 'datetime-local', 'month', 'time', 'week'];
export const isFormItemInputDate = (value: FormItemInput): value is FormItemInputDate =>
  value.type === 'input' && !!value.inputType && inputsTypeDate.includes(value.inputType) && simpleDateTypes.includes((value as FormItemInputDate).date?.dateType ?? defaultDateType);
