import { WithEvents } from "./events/with-events.interface";

export interface SelectableItem
  extends WithEvents {
  label: string;
  value: string | number | object | null;
  disabled?: boolean;
  default?: boolean;
}
