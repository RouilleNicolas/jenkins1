import { FormItem, FormItemType } from "../interfaces/elements/form-item.interface";
import { WithOptions } from "../interfaces/elements/options/with-options.interface";
import { SelectableItem } from "../interfaces/elements/selectable-item.interface";

export const isFormItemWithOptions = (item: unknown): item is FormItem<FormItemType> & WithOptions<SelectableItem> => {
  const itemWithOptions = item as WithOptions<SelectableItem>;
  return !!itemWithOptions.options
    && (!!itemWithOptions.options.items || !!itemWithOptions.options.optionAction);
}
