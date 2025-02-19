import { Position } from "./position.interface";

export type FormItemType = 'input' | 'checkbox' | 'select' | 'radio' | 'divider' | 'label' | 'button';
export interface FormItem<TFormType extends FormItemType> {
  type: TFormType;
  position: Position;
}
