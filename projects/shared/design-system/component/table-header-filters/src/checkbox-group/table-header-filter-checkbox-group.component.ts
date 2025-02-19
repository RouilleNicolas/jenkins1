import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CheckboxGroupComponent, CheckboxGroupData, CheckboxSelectionChange } from '@cooperl/design-system/component/checkbox-group';
import { FilterExecutorDirective } from '../filter-executor.directive';
import { TableHeaderFilterWrapperComponent } from '../wrapper';

@Component({
  selector: 'design-system-table-header-filter-checkbox-group',
  imports: [TableHeaderFilterWrapperComponent, CheckboxGroupComponent],
  hostDirectives: [
    {
      directive: FilterExecutorDirective,
      inputs: ['filterId', 'filterExecutionMode', 'filterFn'],
    },
  ],
  templateUrl: './table-header-filter-checkbox-group.component.html',
  styleUrl: './table-header-filter-checkbox-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderFilterCheckboxGroupComponent<TDataSourceDatum, TCheckboxValue> {
  public readonly data = input.required<CheckboxGroupData<TCheckboxValue>>();
  public readonly withMasterCheckbox = input<boolean, BooleanInput>(true, {
    transform: coerceBooleanProperty,
  });
  public readonly masterCheckboxLabel = input<string>('default.checkbox.master');

  public readonly selectionChange = output<CheckboxSelectionChange<TCheckboxValue>[]>();

  protected readonly filterExecutor: FilterExecutorDirective<CheckboxSelectionChange<TCheckboxValue>[], TDataSourceDatum> =
    inject(FilterExecutorDirective);

  protected applyFilter(selectedAges: CheckboxSelectionChange<TCheckboxValue>[]): void {
    this.selectionChange.emit(selectedAges);

    this.filterExecutor.applyFilter(selectedAges);
  }
}
