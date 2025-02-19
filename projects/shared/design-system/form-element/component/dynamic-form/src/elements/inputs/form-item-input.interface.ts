import { DynamicFormAcceptedValueTypes } from "../../interfaces/dynamic-form-accepted-value-types.interface";
import { WithPrefix } from "../../interfaces/elements/affix/with-prefix.interface";
import { WithSuffix } from "../../interfaces/elements/affix/with-suffix.interface";
import { WithEvents } from "../../interfaces/elements/events/with-events.interface";
import { FieldInput } from "../../interfaces/elements/field/field-input.interface";
import { WithField } from "../../interfaces/elements/field/with-field.interface";
import { FormItem } from "../../interfaces/elements/form-item.interface";
import { WithHint } from "../../interfaces/elements/hint/with-hint.interface";
import { WithTooltip } from "../../interfaces/elements/tooltip/with-tooltip.interface";

export type InputType = 'color' | 'text' | 'email' | 'date' | 'datetime-local' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'time' | 'url' | 'week';

export interface FormItemInput<TDefaultValueType = DynamicFormAcceptedValueTypes>
  extends FormItem<'input'>,
  WithField<FieldInput>,
  WithEvents,
  WithTooltip,
  WithHint,
  WithSuffix,
  WithPrefix {
  inputType?: InputType,
  name?: string;
  label?: string;
  defaultValue?: TDefaultValueType;
  clearable?: boolean;
  placeholder?: string;
  validation?: {
    regex: string;
    errorValidationMessage?: string;
  }
}
