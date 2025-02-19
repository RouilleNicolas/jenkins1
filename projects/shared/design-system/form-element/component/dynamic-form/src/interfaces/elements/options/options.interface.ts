import { FetchActions } from "../fetch-actions.type";
import { SelectableItem } from "../selectable-item.interface";

export interface Options<T extends SelectableItem = SelectableItem> {
  optionAction?: FetchActions;
  items?: Record<string, T>;
}
