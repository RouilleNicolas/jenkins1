import { Options } from "../../interfaces/elements/options/options.interface";
import { SelectableItem } from "../../interfaces/elements/selectable-item.interface";

export interface OptionGroupsSelectItem {
  label: string;
  disabled?: boolean;
}

type OptionGroupsSelect = Record<string, OptionGroupsSelectItem>;

export interface SelectItem
  extends SelectableItem {
  viewValue?: string;
  group?: string;
}

export interface OptionsSelect
  extends Options<SelectItem> {
  groups?: OptionGroupsSelect;
}
