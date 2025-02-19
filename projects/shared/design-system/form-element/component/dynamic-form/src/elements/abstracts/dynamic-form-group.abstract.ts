import { Component, computed, inject, input, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormRecord, ValidatorFn, Validators } from "@angular/forms";
import { injectNgGroup } from "@cooperl/utils/form-control-forward";
import { ToAbstractFormControl } from "@cooperl/utils/to-abstract-control";
import { defaultFormFieldAppearance, defaultFormFieldFloatLabel, FieldInput } from "../../interfaces/elements/field/field-input.interface";
import { WithField } from "../../interfaces/elements/field/with-field.interface";
import { WithHint } from "../../interfaces/elements/hint/with-hint.interface";

type FormElementWithFieldAndDefaultValue<TDefaultValue extends object> = WithField & { defaultValue?: TDefaultValue };

/**
 * This abstract class represents the base class for all dynamic form elements that are composed of multiple controls, like a DateRangePicker.
 *
 * It automatically handles the form group creation, validators, default value, and disabled state.
 *
 * @abstract
 * @template T The type of the form element. It must have `field` and `defaultValue` properties.
 * @template TDefaultValue The type of the default value. It must extends `object`.
 * @template TFormGroup The type of the form group. It must be an object containing the controls of the form element.
 * @see {@link WithField}
 */
@Component({
  selector: 'design-system-dynamic-form-group-do-not-use-this-component-outside-extending-it',
  standalone: true,
  template: '',
})
export abstract class DynamicFormGroupComponent<T extends FormElementWithFieldAndDefaultValue<TDefaultValue>, TDefaultValue extends object, TFormGroup extends ToAbstractFormControl<TDefaultValue> = ToAbstractFormControl<TDefaultValue>> implements OnInit {
  public readonly element = input.required<T>();

  protected formGroup = inject(FormBuilder).record<TFormGroup>({});
  protected readonly hintAlign = computed(() => (this.element() as WithHint).hint?.align ?? 'start');
  protected readonly formFieldAppearance = computed(() => (this.element() as WithField<FieldInput>).field?.appearance ?? defaultFormFieldAppearance);
  protected readonly formFieldFloatLabel = computed(() => (this.element() as WithField<FieldInput>).field?.floatLabel ?? defaultFormFieldFloatLabel);

  protected abstract readonly controlsNames: (keyof TDefaultValue)[];

  private readonly _ngControl = injectNgGroup();

  public ngOnInit(): void {
    if (this._ngControl?.control) {
      this.formGroup = this._ngControl?.control as FormRecord<any>;
    }

    const validators = this._setValidators();
    this._registerControls(validators);
    this._setDefaultValue();
    this._setDisabledState();
  }

  private _setValidators(): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (this.element().field?.required) {
      validators.push(Validators.required);
    }

    this.formGroup.setValidators(validators);

    return validators;
  }

  private _registerControls(validators: ValidatorFn[]): void {
    for (const controlName of this.controlsNames) {
      this.formGroup.registerControl(controlName as string, new FormControl(null, validators) as any);
    }
  }

  private _setDefaultValue(): void {
    const defaultValue = this.element().defaultValue;

    if (defaultValue) {
      for (const [key, value] of Object.entries(defaultValue)) {
        this.formGroup.get(key)?.setValue(value, { emitEvent: false });
      }
    }
  }

  private _setDisabledState(): void {
    if (this.element().field?.disabled) {
      this.formGroup.disable();
    }
  }
}
