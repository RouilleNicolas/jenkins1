import { Field } from "./field.interface";

export interface WithField<TFieldType extends Field = Field> {
  field?: TFieldType;
}
