import { CheckboxGroupDatum } from "./checkbox-group-datum.interface";

export function coerceToDatum<T>(data: string[] | CheckboxGroupDatum<T>[]): CheckboxGroupDatum<T>[] {
  return data.map((datum, index) => typeof datum === 'string' ? <CheckboxGroupDatum<T>>{ id: index.toString(), value: datum, label: datum } : datum);
}
