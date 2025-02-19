import { NgIf } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopValueAccessorDirective } from '@cooperl/utils/form-control-forward';
import { InternalValidators } from '@cooperl/utils/validators';
import { TranslocoDirective } from '@jsverse/transloco';
import { DynamicFormControlComponent } from '../../abstracts/dynamic-form-control.abstract';
import { DynamicFormErrorsComponent } from '../../dynamic-form-errors/dynamic-form-errors.component';
import { FormItemInputText } from './form-item-input-text.interface';

@Component({
  selector: 'design-system-dynamic-form-input-text',
  imports: [
    // Angular
    ReactiveFormsModule,
    NgIf,
    // External
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    TranslocoDirective,
    // Internal
    DynamicFormErrorsComponent,
  ],
  hostDirectives: [NoopValueAccessorDirective],
  templateUrl: './dynamic-form-input-text.component.html',
  styleUrl: './dynamic-form-input-text.component.scss',
})
export class DynamicFormInputTextComponent extends DynamicFormControlComponent<FormItemInputText, string> implements OnInit {
  protected readonly placeholder = computed(() => this.element().placeholder ?? '');
  protected readonly maxlength = computed(() => this.element().text?.validation?.maxlength ?? this.element().text?.validation?.size ?? null);

  public override ngOnInit(): void {
    super.ngOnInit();

    this._initializeValidators();
  }

  private _initializeValidators(): void {
    const value = this.element();

    if (value.validation?.regex) {
      this.formControl.addValidators(Validators.pattern(value.validation.regex));
    }

    if (value.text?.validation?.size) {
      this.formControl.addValidators(InternalValidators.text.size(value.text.validation.size));
    }

    if (value.text?.validation?.maxlength) {
      this.formControl.addValidators(Validators.maxLength(value.text.validation.maxlength));
    }

    if (value.text?.validation?.minlength) {
      this.formControl.addValidators(Validators.minLength(value.text.validation.minlength));
    }
  }
}
