import { FormItemButton } from "../elements/dynamic-form-button/form-item-button.interface";
import { FormItemCheckbox } from "../elements/dynamic-form-checkbox/form-item-checkbox.interface";
import { FormItemDivider } from "../elements/dynamic-form-divider/form-item-divider.interface";
import { FormItemLabel } from "../elements/dynamic-form-label/form-item-label.interface";
import { FormItemRadio } from "../elements/dynamic-form-radio/form-item-radio.interface";
import { FormItemSelect } from "../elements/dynamic-form-select/form-item-select.interface";
import { FormItemInputDateRange } from "../elements/inputs/dynamic-form-input-date-range/form-item-input-date-range.interface";
import { FormItemInputDate } from "../elements/inputs/dynamic-form-input-date/form-item-input-date.interface";
import { FormItemInputNumber } from "../elements/inputs/dynamic-form-input-number/form-item-input-number.interface";
import { FormItemInputText } from "../elements/inputs/dynamic-form-input-text/form-item-input-text.interface";

export const DynamicFormElementGenerators = {
  // Form fields
  input: {
    // Color
    // color: (element: DynamicFormInputColor): DynamicFormInputColor => element,
    // Number
    number: (element: FormItemInputNumber): FormItemInputNumber => element,
    // Date
    date: (element: FormItemInputDate): FormItemInputDate => element,
    dateRange: (element: FormItemInputDateRange): FormItemInputDateRange => element,
    // dateTimeLocale: (element: DynamicFormInputDateTimeLocal): DynamicFormInputDateTimeLocal => element,
    // time: (element: DynamicFormInputTime): DynamicFormInputTime => element,
    // week: (element: DynamicFormInputWeek): DynamicFormInputWeek => element,
    // month: (element: DynamicFormInputMonth): DynamicFormInputMonth => element,
    // Text
    text: (element: FormItemInputText): FormItemInputText => element,
    // search: (element: DynamicFormInputSearch): DynamicFormInputSearch => element,
    // url: (element: DynamicFormInputUrl): DynamicFormInputUrl => element,
    // tel: (element: DynamicFormInputTel): DynamicFormInputTel => element,
    // email: (element: DynamicFormInputEmail): DynamicFormInputEmail => element,
    // password: (element: DynamicFormInputPassword): DynamicFormInputPassword => element,
    // textarea: (element: DynamicFormInputTextarea): DynamicFormInputTextarea => element,
  },
  checkbox: (element: FormItemCheckbox): FormItemCheckbox => element,
  radio: (element: FormItemRadio): FormItemRadio => element,
  select: (element: FormItemSelect): FormItemSelect => element,
  // Other elements
  button: (element: FormItemButton): FormItemButton => element,
  divider: (element: FormItemDivider): FormItemDivider => element,
  label: (element: FormItemLabel): FormItemLabel => element,
};
