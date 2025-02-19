import { WithEvents } from "../../interfaces/elements/events/with-events.interface";
import { WithField } from "../../interfaces/elements/field/with-field.interface";
import { FormItem } from "../../interfaces/elements/form-item.interface";
import { WithTooltip } from "../../interfaces/elements/tooltip/with-tooltip.interface";

type LabelPosition = 'before' | 'after';

export interface FormItemCheckbox
  extends FormItem<'checkbox'>,
  WithField,
  WithTooltip,
  WithEvents {
  label: string;
  labelPosition?: LabelPosition;
  indeterminate?: boolean;
  name?: string;
  defaultValue?: boolean;
}

export const defaultCheckboxLabelPosition: LabelPosition = 'after';
