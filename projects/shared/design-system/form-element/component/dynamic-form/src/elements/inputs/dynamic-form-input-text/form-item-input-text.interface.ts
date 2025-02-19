import { FormItemInput } from "../form-item-input.interface";

export interface FormItemInputText
  extends FormItemInput<string> {
  text?: {
    pattern?: string;
    multiple?: boolean;
    validation?: {
      size?: number;
      maxlength?: number;
      minlength?: number;
      minlengthWarning?: string;
      maxlengthWarning?: string;
      warningMessage?: string;
    }
  };
}
