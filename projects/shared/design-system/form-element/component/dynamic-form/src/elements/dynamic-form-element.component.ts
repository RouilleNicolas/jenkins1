import { Component, effect, inject, Injector, input, Type, ViewContainerRef } from '@angular/core';
import { Logger } from '@cooperl/logger';
import { NoopValueAccessorDirective } from '@cooperl/utils/form-control-forward';
import { FormItem, FormItemType } from '../interfaces/elements/form-item.interface';
import { isFormItemInputDate, isFormItemInputDateRange } from '../types-guards';
import { DynamicFormButtonComponent } from './dynamic-form-button/dynamic-form-button.component';
import { DynamicFormCheckboxComponent } from './dynamic-form-checkbox/dynamic-form-checkbox.component';
import { DynamicFormDividerComponent } from './dynamic-form-divider/dynamic-form-divider.component';
import { DynamicFormLabelComponent } from './dynamic-form-label/dynamic-form-label.component';
import { DynamicFormRadioComponent } from './dynamic-form-radio/dynamic-form-radio.component';
import { DynamicFormSelectComponent } from './dynamic-form-select/dynamic-form-select.component';
import { DynamicFormInputDateRangeComponent } from './inputs/dynamic-form-input-date-range/dynamic-form-input-date-range.component';
import { DynamicFormInputDateComponent } from './inputs/dynamic-form-input-date/dynamic-form-input-date.component';
import { FormItemInputDate } from './inputs/dynamic-form-input-date/form-item-input-date.interface';
import { DynamicFormInputNumberComponent } from './inputs/dynamic-form-input-number/dynamic-form-input-number.component';
import { DynamicFormInputTextComponent } from './inputs/dynamic-form-input-text/dynamic-form-input-text.component';
import { FormItemInput } from './inputs/form-item-input.interface';

@Component({
  selector: 'design-system-dynamic-form-element',
  imports: [
    // Angular
    // External
    // Internal
  ],
  hostDirectives: [NoopValueAccessorDirective],
  template: '',
  styleUrl: './dynamic-form-element.component.scss',
})
export class DynamicFormElementComponent {
  public readonly element = input.required<FormItem<FormItemType>>();

  private displayed = false;
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly _logger = new Logger('Dynamic Form Element');
  private readonly _injector = inject(Injector);

  public constructor() {
    effect(() => this._instantiateComponent());
  }

  private _instantiateComponent() {
    if (this.displayed) {
      this.viewContainerRef.clear();
      this.displayed = false;
    }

    if (!this.displayed) {
      const componentRef = this.viewContainerRef.createComponent(this._computeComponentType(), { injector: this._injector });
      componentRef?.setInput('element', this.element());
      this.displayed = true;
    }
  }

  private _computeComponentType(): Type<unknown> {
    switch (this.element().type) {
      case 'button':
        return DynamicFormButtonComponent;
      case 'divider':
        return DynamicFormDividerComponent;
      case 'checkbox':
        return DynamicFormCheckboxComponent;
      case 'input':
        return this._computeInputComponentType();
      case 'label':
        return DynamicFormLabelComponent;
      case 'radio':
        return DynamicFormRadioComponent;
      case 'select':
        return DynamicFormSelectComponent;
      default:
        this._logger.warn(`Unknown form element type: ${this.element().type}`);
        return DynamicFormInputTextComponent;
    }
  }

  private _computeInputComponentType(): Type<unknown> {
    const inputElement = this.element() as FormItemInput;
    switch (inputElement.inputType) {
      case 'date':
      case 'datetime-local':
      case 'month':
      case 'time':
      case 'week':
        return this._computeInputDateComponentType();
      case 'number':
        return DynamicFormInputNumberComponent;
      case 'text':
      case 'color':
      case 'email':
      case 'password':
      case 'search':
      case 'tel':
      case 'url':
        return DynamicFormInputTextComponent;
      case undefined:
        this._logger.warn(`Form input type is undefined, defaulting to text input`);
        return DynamicFormInputTextComponent;
      default:
        this._logger.warn(`Unknown form input type: ${inputElement.inputType}`);
        return DynamicFormInputTextComponent;
    }
  }

  private _computeInputDateComponentType(): Type<unknown> {
    const inputDateElement = this.element() as FormItemInput;

    if (isFormItemInputDate(inputDateElement)) {
      return DynamicFormInputDateComponent;
    }

    if (isFormItemInputDateRange(inputDateElement)) {
      return DynamicFormInputDateRangeComponent;
    }

    const itemAsDateItem = inputDateElement as FormItemInputDate;

    if (!itemAsDateItem.date?.dateType) {
      this._logger.warn(`Form input date type is undefined, defaulting to date input`);
      return DynamicFormInputDateComponent;
    }

    this._logger.warn(`Unknown form input date type: ${itemAsDateItem.date?.dateType}`);
    return DynamicFormInputDateComponent;
  }
}
