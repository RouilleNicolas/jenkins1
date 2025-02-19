import { NgIf } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NoopValueAccessorDirective } from '@cooperl/utils/form-control-forward';
import { InternalValidators } from '@cooperl/utils/validators';
import { TranslocoDirective } from '@jsverse/transloco';
import { DynamicFormGroupComponent } from '../../abstracts/dynamic-form-group.abstract';
import { DynamicFormErrorsComponent } from '../../dynamic-form-errors/dynamic-form-errors.component';
import { defaultDateStartView } from '../dynamic-form-input-date/form-item-input-date.interface';
import { DateRange } from './date-range.interface';
import { FormItemInputDateRange } from './form-item-input-date-range.interface';

@Component({
  selector: 'design-system-dynamic-form-input-date-range',
  imports: [
    // Angular
    ReactiveFormsModule,
    NgIf,
    // External
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    TranslocoDirective,
    // Internal
    DynamicFormErrorsComponent,
  ],
  hostDirectives: [NoopValueAccessorDirective],
  templateUrl: './dynamic-form-input-date-range.component.html',
  styleUrl: './dynamic-form-input-date-range.component.scss',
})
export class DynamicFormInputDateRangeComponent extends DynamicFormGroupComponent<FormItemInputDateRange, DateRange> implements OnInit {
  protected readonly startView = computed(() => this.element().date.startView ?? defaultDateStartView);
  protected readonly startDateControlName: keyof DateRange = 'start';
  protected readonly endDateControlName: keyof DateRange = 'end';
  protected override controlsNames: (keyof DateRange)[] = [this.startDateControlName, this.endDateControlName];

  public override ngOnInit(): void {
    super.ngOnInit();

    this._initializeValidators();
  }

  protected clear(): void {
    this.formGroup.reset();
  }

  private _initializeValidators(): void {
    const value = this.element();

    // Skip Regex validation for now
    // Reason : The regex validation is not working as expected,
    // the displayed value IS formatted correctly but the validation is checking the raw value which is a Date object
    // if (value.validation?.regex) {
    //   this.formGroup.addValidators(Validators.pattern(value.validation.regex));
    // }

    if (value.date.validation?.max) {
      this.formGroup.get(this.startDateControlName)?.addValidators(InternalValidators.date.max(new Date(value.date.validation.max)));
      this.formGroup.get(this.endDateControlName)?.addValidators(InternalValidators.date.max(new Date(value.date.validation.max)));
    }

    if (value.date.validation?.min) {
      this.formGroup.get(this.startDateControlName)?.addValidators(InternalValidators.date.min(new Date(value.date.validation.min)));
      this.formGroup.get(this.endDateControlName)?.addValidators(InternalValidators.date.min(new Date(value.date.validation.min)));
    }
  }
}
