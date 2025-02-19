export interface CheckboxGroupDatum<T> {
  id: string;
  value: T;
  label: string;
  /** The selection state to set at the component init */
  selected?: boolean;
  /** Additional CSS class to apply to the associated checkbox */
  classes?: string
}
