import { NgIf } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopValueAccessorDirective } from '@cooperl/utils/form-control-forward';
import { TranslocoDirective } from '@jsverse/transloco';
import { DynamicFormControlComponent } from '../../abstracts/dynamic-form-control.abstract';
import { DynamicFormErrorsComponent } from '../../dynamic-form-errors/dynamic-form-errors.component';
import { FormItemInputNumber } from './form-item-input-number.interface';

@Component({
  selector: 'design-system-dynamic-form-input-number',
  imports: [
    // Angular
    ReactiveFormsModule,
    NgIf,
    // External
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslocoDirective,
    // Internal
    DynamicFormErrorsComponent,
  ],
  hostDirectives: [NoopValueAccessorDirective],
  templateUrl: './dynamic-form-input-number.component.html',
  styleUrl: './dynamic-form-input-number.component.scss',
})
export class DynamicFormInputNumberComponent extends DynamicFormControlComponent<FormItemInputNumber, number> implements OnInit {
  protected readonly placeholder = computed(() => this.element().placeholder ?? '');

  public override ngOnInit(): void {
    super.ngOnInit();

    this._initializeValidators();
  }

  private _initializeValidators(): void {
    const value = this.element();
    if (Number.isInteger(value.number.validation?.max)) {
      this.formControl.addValidators(Validators.max(value.number.validation?.max ?? 0));
    }

    if (Number.isInteger(value.number.validation?.min)) {
      this.formControl.addValidators(Validators.min(value.number.validation?.min ?? 0));
    }
  }
}
