import { FormItem } from "../../interfaces/elements/form-item.interface";

export interface FormItemDivider
  extends FormItem<'divider'> {
  inset?: boolean;
  vertical?: boolean;
}
