import { Field } from "./field.interface";

export interface RequiredField extends Field {
  required: boolean;
  hideRequiredMarker: boolean;
  errorRequiredMessage: string;
}

export const isRequiredField = (field: Field): field is RequiredField => field.required !== undefined;
