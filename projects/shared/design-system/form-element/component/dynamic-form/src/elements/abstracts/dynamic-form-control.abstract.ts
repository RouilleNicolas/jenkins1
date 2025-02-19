import { Component, computed, inject, input, OnInit } from "@angular/core";
import { FormBuilder, FormControl, NgControl, ValidatorFn, Validators } from "@angular/forms";
import { DynamicFormAcceptedValueTypes } from "../../interfaces/dynamic-form-accepted-value-types.interface";
import { defaultFormFieldAppearance, defaultFormFieldFloatLabel, FieldInput } from "../../interfaces/elements/field/field-input.interface";
import { WithField } from "../../interfaces/elements/field/with-field.interface";
import { WithHint } from "../../interfaces/elements/hint/with-hint.interface";

type FormElementWithFieldAndDefaultValue<TDefaultValue extends DynamicFormAcceptedValueTypes> = WithField<FieldInput> & { defaultValue?: TDefaultValue };

/**
 * This abstract class represents the base class for all dynamic form elements.
 *
 * It automatically handles the form control creation, validators, default value, and disabled state.
 *
 * @abstract
 * @template T The type of the form element. It must have `field` and `defaultValue` properties.
 * @template TDefaultValue The type of the default value. It must extends `DynamicFormAcceptedValueTypes`.
 * @see {@link WithField}
 * @see {@link FieldInput}
 * @see {@link DynamicFormAcceptedValueTypes}
 */
@Component({
  selector: 'design-system-dynamic-form-control-do-not-use-this-component-outside-extending-it',
  standalone: true,
  template: '',
})
export abstract class DynamicFormControlComponent<
  T extends FormElementWithFieldAndDefaultValue<TDefaultValue>,
  TDefaultValue extends DynamicFormAcceptedValueTypes
> implements OnInit {
  public readonly element = input.required<T>();

  protected formControl = inject(FormBuilder).control<TDefaultValue | null>(null);
  /**
   * The required validator.
   *
   * It is automatically added if the `required` property of the form element is set to `true`.
   *
   * @default Validators.required
   * @see {@link https://angular.dev/api/forms/Validators#required}
   */
  protected requiredValidator = Validators.required;
  protected readonly hintAlign = computed(() => (this.element() as WithHint).hint?.align ?? 'start');
  protected readonly formFieldAppearance = computed(() => this.element().field?.appearance ?? defaultFormFieldAppearance);
  protected readonly formFieldFloatLabel = computed(() => this.element().field?.floatLabel ?? defaultFormFieldFloatLabel);

  private readonly _ngControl = inject(NgControl, { optional: true });
  private readonly _formBuilder = inject(FormBuilder);

  public ngOnInit(): void {
    this.formControl = (this._ngControl?.control as FormControl) ?? this._formBuilder.control(null);

    this._setValidators();
    this._setDefaultValue();
    this._setDisabledState();
  }

  private _setValidators(): void {
    const validators: ValidatorFn[] = [];

    if (this.element().field?.required) {
      validators.push(this.requiredValidator);
    }

    this.formControl.setValidators(validators);
  }

  private _setDefaultValue(): void {
    const defaultValue = this.element().defaultValue;

    if (defaultValue) {
      this.formControl.setValue(defaultValue, { emitEvent: false });
    }
  }

  private _setDisabledState(): void {
    if (this.element().field?.disabled) {
      this.formControl.disable();
    }
  }
}
