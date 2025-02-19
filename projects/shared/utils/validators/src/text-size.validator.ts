import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function textSize(size: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value?.length !== size) {
      return {
        "text-size": {
          actual: control.value?.length,
          required: size
        }
      };
    }

    return null;
  };
}
