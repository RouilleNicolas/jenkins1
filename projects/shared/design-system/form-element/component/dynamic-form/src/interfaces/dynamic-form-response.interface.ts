import { FormItem, FormItemType } from "./elements/form-item.interface";
import { FormId } from "./form-id.interface";

export interface DynamicFormResponse {
  id: FormId;
  description: string;
  items: Record<string, FormItem<FormItemType>>;
}
