import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  forwardRef,
  HostBinding,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { TestIdDirective } from '@cooperl/design-system/directive/test-id';
import { TranslocoDirective } from '@jsverse/transloco';
import { Subject, takeUntil } from 'rxjs';
import { CheckboxGroupDatum } from './checkbox-group-datum.interface';
import { CheckboxSelectionChange } from './checkbox-selection-change.interface';
import { coerceToDatum } from './coerce-to-datum';
import { CheckboxGroupDatumFilters } from './datum-filters';

type Orientation = 'horizontal' | 'vertical';
const defaultOrientation: Orientation = 'horizontal';

@Component({
  selector: 'design-system-checkbox-group',
  imports: [
    // Angular
    NgClass,
    // External
    MatCheckboxModule,
    MatDividerModule,
    TranslocoDirective,
    // Internal
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true,
    },
  ],
  hostDirectives: [
    {
      directive: TestIdDirective,
      inputs: ['designSystemTestId: testId'],
    },
  ],
  templateUrl: './checkbox-group.component.html',
  styleUrl: './checkbox-group.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CheckboxGroupComponent<T> implements OnInit, ControlValueAccessor {
  public readonly data = input.required<CheckboxGroupDatum<T>[], string[] | CheckboxGroupDatum<T>[]>({ transform: coerceToDatum });
  public readonly orientation = input<Orientation>(defaultOrientation);
  /** Additional classes to apply to all checkboxes but master checkbox */
  public readonly checkboxesClasses = input<string>('');
  /**
   * Additional classes to apply to the container of all checkboxes.<br/>
   * Warning, the container does not contains the master checkbox.
   * */
  public readonly checkboxContainerClasses = input<string>('');
  /** Display the master checkbox on true */
  public readonly withMasterCheckbox = input<boolean, BooleanInput>(false, {
    transform: coerceBooleanProperty,
  });
  public readonly masterCheckboxLabel = input<string>('default.checkbox.master');
  /** Additional classes to apply to the master checkbox */
  public readonly masterCheckboxClasses = input<string>('');

  /** Emits the list of selected ids/value pair */
  public readonly selectionChange = output<CheckboxSelectionChange<T>[]>();

  protected readonly selection = signal(new SelectionModel<CheckboxGroupDatum<T>>(true, []));
  protected readonly allChecked = computed(() => this.selection().selected.length === this.data().length);
  protected readonly indeterminate = computed(() => !!this.selection().selected.length && !this.allChecked());

  @HostBinding('class')
  protected hostClasses = `${defaultOrientation}-orientation`;

  private readonly _selectionRefreshed$ = new Subject<void>();
  private readonly _destroyRef = inject(DestroyRef);

  public constructor() {
    effect(() => (this.hostClasses = `${this.orientation()}-orientation`));

    this._observeSelectionChange();
  }

  public ngOnInit(): void {
    this.selection().select(...this.data().filter(CheckboxGroupDatumFilters.bySelectedStatus(true)));
  }

  public writeValue(ids: string[]): void {
    if (!(Array.isArray(ids) && ids.every((id) => typeof id === 'string'))) {
      throw new Error('CheckboxGroupComponent: writeValue must be called with an array of string which represent the ids');
    }

    this.selection().select(...this.data().filter(CheckboxGroupDatumFilters.byId(ids)));
  }

  public registerOnChange(fn: (selection: string[]) => unknown): void {
    this.selectionChange.subscribe((selection) => fn(selection.map(({ id }) => id)));
  }

  public registerOnTouched(): void {
    // Nothing to do for now
  }

  protected toggleAll(isChecked: boolean): void {
    if (isChecked || this.indeterminate()) {
      this.selection().select(...this.data());
    } else {
      this.selection().clear();
    }

    this._forceSelectionSignalRefresh();
  }

  protected toggle(datum: CheckboxGroupDatum<T>): void {
    this.selection().toggle(datum);
    this._forceSelectionSignalRefresh();
  }

  private _forceSelectionSignalRefresh(): void {
    // Return a new selection model to trigger change detection
    this.selection.update(() => new SelectionModel<CheckboxGroupDatum<T>>(true, this.selection().selected));
    this._observeSelectionChange();
  }

  private _observeSelectionChange(): void {
    // Ensure to trigger the subject linked to the selectionChanged subscription destruction
    this._selectionRefreshed$.next();

    this.selection()
      .changed.pipe(takeUntil(this._selectionRefreshed$), takeUntilDestroyed(this._destroyRef))
      .subscribe((x) => this.selectionChange.emit(x.source.selected.map(({ id, value }) => ({ id, value }))));
  }
}
