import { ChangeDetectorRef, computed, inject } from "@angular/core";
import { Logger } from "@cooperl/logger";
import { Async } from "@cooperl/utils";
import { MaybeArray } from "date-fns";
import { Observable, of, tap } from "rxjs";
import { FieldInput } from "../../interfaces/elements/field/field-input.interface";
import { WithField } from "../../interfaces/elements/field/with-field.interface";
import { WithOptions } from "../../interfaces/elements/options/with-options.interface";
import { SelectableItem } from "../../interfaces/elements/selectable-item.interface";
import { FetchActionResponse } from "../../interfaces/fetch-action-response.interface";
import { FetchActionsProvider } from "../../interfaces/fetch-action.provider";
import { DynamicFormControlComponent } from "./dynamic-form-control.abstract";

type FormElementWithFieldAndOptions<T extends SelectableItem> = WithField<FieldInput> & WithOptions<T>;

/**
 * This abstract class represents a dynamic form element that has selectable items, like a Radio or a Select element.
 *
 * It automatically compute the options from either the `items` or `optionAction` property of the form element.
 *
 * @abstract
 * @template T The type of the form element. It must have `field` and `options` properties.
 * @template TItem The type of the selectable items. It must extends `SelectableItem`.
 * @template TDefaultValueType The type of the default value. It must be either a single value or an array of values. Default is `SelectableItem['value']`.
 * @see {@link WithField}
 * @see {@link WithOptions}
 * @see {@link FieldInput}
 * @see {@link SelectableItem}
 */
export abstract class DynamicFormControlSelectableItems<
  T extends FormElementWithFieldAndOptions<TItem>,
  TItem extends SelectableItem,
  TDefaultValueType extends MaybeArray<SelectableItem['value']> = SelectableItem['value']>
  extends DynamicFormControlComponent<T, TDefaultValueType> {

  /**
   * Set the default value when the options changed.
   *
   * By default, it sets the default value to the first item with the `default` property set to `true`.
   */
  protected setDefaultValue = this.setDefaultValueFromResponse;
  protected abstract readonly _logger: Logger<unknown>;
  /**
   * Used to keep the original order of the options' keyvalue map in the template
   *
   * By default, angular orders the keyvalue map by the key, so we need to keep the original order.
   */
  protected readonly keepOriginalOrder = () => 0;
  /**
   * The options of the form element.
   *
   * It automatically fetch the items from the `items` or `optionAction` property of the form element and set the default value of the form control.
   */
  protected readonly options = computed(() => {
    const value = this.element();

    let fetchItems: Async<FetchActionResponse<TItem>> = of({});

    if (value.options.items) {
      fetchItems = of(value.options.items);
    } else if (value.options.optionAction) {
      const fetchAction = this._fetchActionProvider?.fetchActionMap.get(value.options.optionAction);

      if (!fetchAction) {
        this._logger.error('No fetch action found for optionAction', value.options.optionAction);
      }

      fetchItems = fetchAction?.() ?? of({});
    }

    // Set the default value from the response
    if (fetchItems instanceof Observable) {
      fetchItems = fetchItems.pipe(
        tap((items) => {
          this.setDefaultValue(items);
        })
      );
    } else if (fetchItems instanceof Promise) {
      fetchItems = fetchItems.then((items) => {
        this.setDefaultValue(items);
        return items;
      });
    }

    return fetchItems;
  });

  protected readonly _changeDetection = inject(ChangeDetectorRef);
  private readonly _fetchActionProvider = inject<FetchActionsProvider<TItem>>(FetchActionsProvider, { optional: true });

  protected setDefaultValueFromResponse(items: FetchActionResponse): void {
    const defaultValue = (Object.values(items).find((item) => item.default)?.value ?? null);
    this.formControl.setValue(defaultValue as TDefaultValueType);
    this._changeDetection.detectChanges();
  }
}
