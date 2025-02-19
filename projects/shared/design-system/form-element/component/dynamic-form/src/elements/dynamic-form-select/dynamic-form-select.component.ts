import { AsyncPipe, KeyValuePipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule, MatSuffix } from '@angular/material/select';
import { Logger } from '@cooperl/logger';
import { Async } from '@cooperl/utils';
import { NoopValueAccessorDirective } from '@cooperl/utils/form-control-forward';
import { TranslocoDirective } from '@jsverse/transloco';
import { MaybeArray } from 'date-fns';
import { map, Observable } from 'rxjs';
import { FetchActionResponse } from '../../interfaces/fetch-action-response.interface';
import { DynamicFormControlSelectableItems } from '../abstracts/dynamic-form-control-selectable-items.abstract';
import { DynamicFormErrorsComponent } from '../dynamic-form-errors/dynamic-form-errors.component';
import { AsSelectItemArrayPipe } from './as-select-item-array.pipe';
import { AsSelectItemPipe } from './as-select-item.pipe';
import { FormItemSelect } from './form-item-select.interface';
import { OptionGroupsSelectItem, SelectItem } from './options-select.interface';

type UiGroup = OptionGroupsSelectItem & { options: Map<string, SelectItem> };

@Component({
  selector: 'design-system-dynamic-form-select',
  imports: [
    // Angular
    ReactiveFormsModule,
    KeyValuePipe,
    AsyncPipe,
    NgTemplateOutlet,
    // External
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSuffix,
    MatChipsModule,
    TranslocoDirective,
    // Internal
    DynamicFormErrorsComponent,
    AsSelectItemPipe,
    AsSelectItemArrayPipe,
  ],
  hostDirectives: [NoopValueAccessorDirective],
  templateUrl: './dynamic-form-select.component.html',
  styleUrl: './dynamic-form-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormSelectComponent extends DynamicFormControlSelectableItems<FormItemSelect, SelectItem, MaybeArray<SelectItem>> {
  protected override readonly _logger = new Logger('DynamicFormSelectComponent');
  protected readonly hasGroups = computed(() => {
    const element = this.element();
    return element.options.groups && Object.keys(element.options.groups).length > 0;
  });
  protected readonly optionsByGroup = computed<Async<Map<string, UiGroup>>>(() => {
    const options = this.options();

    if (options instanceof Promise) {
      return options.then((options) => this._groupOptions(options));
    } else if (options instanceof Observable) {
      return options.pipe(map((options) => this._groupOptions(options)));
    }

    throw new Error('Options should be a promise or an observable');
  });

  constructor() {
    super();

    effect(() => {
      this.setDefaultValue = this.element().multiple ? this._setMultipleDefaultValueFromResponse : this.setDefaultValueFromResponse;
    });
  }

  protected removeChip(event: MatChipEvent): void {
    const value = this.formControl.value as SelectItem[];
    const index = value.indexOf(event.chip.value);

    if (index !== -1) {
      value.splice(index, 1);
      this.formControl.setValue(value);
    }
  }

  protected override setDefaultValueFromResponse(items: FetchActionResponse): void {
    const defaultValue = Object.values(items).find((item) => item.default) ?? null;
    this.formControl.setValue(defaultValue);
    this._changeDetection.detectChanges();
  }

  private _groupOptions(options: FetchActionResponse<SelectItem>): Map<string, UiGroup> {
    const optionsByGroups = new Map<string, UiGroup>();

    if (!this.hasGroups()) {
      for (const [key, item] of Object.entries(options)) {
        optionsByGroups.set(key, { label: '', options: new Map([['', item]]) });
      }
    } else {
      const element = this.element();

      for (const [groupKey, group] of Object.entries(element.options.groups ?? {})) {
        optionsByGroups.set(groupKey, {
          ...group,
          options: new Map(),
        });

        for (const [itemKey, item] of Object.entries(options).filter((entries) => entries[1].group === groupKey)) {
          optionsByGroups.get(groupKey)?.options.set(itemKey, item);
        }
      }
    }

    return optionsByGroups;
  }

  private _setMultipleDefaultValueFromResponse(items: FetchActionResponse<SelectItem>): void {
    const defaultValue = Object.values(items).filter((item) => item.default);
    this.formControl.setValue(defaultValue);
    this._changeDetection.detectChanges();
  }
}
