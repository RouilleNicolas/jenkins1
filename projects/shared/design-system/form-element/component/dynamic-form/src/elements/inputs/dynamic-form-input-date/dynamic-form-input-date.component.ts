import { NgIf } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopValueAccessorDirective } from '@cooperl/utils/form-control-forward';
import { InternalValidators } from '@cooperl/utils/validators';
import { TranslocoDirective } from '@jsverse/transloco';
import { DynamicFormControlComponent } from '../../abstracts/dynamic-form-control.abstract';
import { DynamicFormErrorsComponent } from '../../dynamic-form-errors/dynamic-form-errors.component';
import { defaultDateStartView, FormItemInputDate } from './form-item-input-date.interface';

@Component({
  selector: 'design-system-dynamic-form-input-date',
  imports: [
    // Angular
    ReactiveFormsModule,
    NgIf,
    // External
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    TranslocoDirective,
    // Internal
    DynamicFormErrorsComponent,
  ],
  hostDirectives: [NoopValueAccessorDirective],
  templateUrl: './dynamic-form-input-date.component.html',
  styleUrl: './dynamic-form-input-date.component.scss',
})
export class DynamicFormInputDateComponent extends DynamicFormControlComponent<FormItemInputDate, Date> implements OnInit {
  protected readonly startView = computed(() => this.element().date.startView ?? defaultDateStartView);

  public override ngOnInit(): void {
    super.ngOnInit();

    this._initializeValidators();
  }

  private _initializeValidators(): void {
    const value = this.element();

    // Skip Regex validation for now
    // Reason : The regex validation is not working as expected,
    // the displayed value IS formatted correctly but the validation is checking the raw value which is a Date object
    // if (value.validation?.regex) {
    //   this.formControl.addValidators(Validators.pattern(new RegExp(value.validation.regex)));
    // }

    if (value.date.validation?.max) {
      this.formControl.addValidators(InternalValidators.date.max(new Date(value.date.validation.max)));
    }

    if (value.date.validation?.min) {
      this.formControl.addValidators(InternalValidators.date.min(new Date(value.date.validation.min)));
    }
  }
}
