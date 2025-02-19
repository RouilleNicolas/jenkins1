import { FormItem } from "../../interfaces/elements/form-item.interface";

export interface FormItemLabel
  extends FormItem<'label'> {
  content: string;
}
