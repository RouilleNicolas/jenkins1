import { WithEvents } from "../../interfaces/elements/events/with-events.interface";
import { WithField } from "../../interfaces/elements/field/with-field.interface";
import { FormItem } from "../../interfaces/elements/form-item.interface";
import { WithOptions } from "../../interfaces/elements/options/with-options.interface";
import { SelectableItem } from "../../interfaces/elements/selectable-item.interface";

export interface RadioItem
  extends SelectableItem {
  labelPosition?: 'before' | 'after';
}

export interface FormItemRadio
  extends FormItem<'radio'>,
  WithOptions<RadioItem>,
  WithField,
  WithEvents {
  label: string;
  name?: string;
}

export const defaultRadioLabelPosition: RadioItem['labelPosition'] = 'after';
