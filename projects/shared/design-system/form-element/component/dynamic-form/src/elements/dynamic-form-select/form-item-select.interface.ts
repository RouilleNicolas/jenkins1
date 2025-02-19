import { WithEvents } from "../../interfaces/elements/events/with-events.interface";
import { FieldInput } from "../../interfaces/elements/field/field-input.interface";
import { WithField } from "../../interfaces/elements/field/with-field.interface";
import { FormItem } from "../../interfaces/elements/form-item.interface";
import { OptionsSelect } from "./options-select.interface";

export interface FormItemSelect
  extends FormItem<'select'>,
  WithField<FieldInput>,
  WithEvents {
  options: OptionsSelect;
  clearable?: boolean;
  multiple?: boolean;
  multipleChip?: boolean;
  hideSingleSelectionIndicator?: boolean;
  name?: string;
  label?: string;
  placeholder?: string;
}
