import { SelectableItem } from "../selectable-item.interface";
import { Options } from "./options.interface";

export interface WithOptions<T extends SelectableItem> {
  options: Options<T>
};
