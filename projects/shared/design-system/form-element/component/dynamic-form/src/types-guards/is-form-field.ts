import { Field } from "../interfaces/elements/field/field.interface";
import { WithField } from "../interfaces/elements/field/with-field.interface";
import { FormItem, FormItemType } from "../interfaces/elements/form-item.interface";

const formFields: FormItemType[] = ['input', 'select', 'checkbox', 'radio'];
type FormField = FormItem<FormItemType> & WithField<Field>;
export const isFormField = (formItem: FormItem<FormItemType>): formItem is FormField => formFields.includes(formItem.type);
