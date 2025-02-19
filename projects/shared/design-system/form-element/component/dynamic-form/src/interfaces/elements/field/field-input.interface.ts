import { Field } from "./field.interface";

export interface FieldInput extends Field {
  appearance?: 'fill' | 'outline',
  floatLabel?: 'always' | 'auto',
}

export const defaultFormFieldAppearance: Required<FieldInput>['appearance'] = 'fill';
export const defaultFormFieldFloatLabel: Required<FieldInput>['floatLabel'] = 'auto';
