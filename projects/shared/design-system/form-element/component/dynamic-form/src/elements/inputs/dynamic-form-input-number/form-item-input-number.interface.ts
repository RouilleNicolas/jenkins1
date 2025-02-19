import { FormItemInput } from "../form-item-input.interface";

export interface FormItemInputNumber
  extends FormItemInput<number> {
  number: {
    step?: number;
    validation?: {
      min?: number;
      max?: number;
      minWarning?: string;
      maxWarning?: string;
      warningMessage?: string;
    }
  };
}
