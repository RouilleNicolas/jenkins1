import { AbstractControl } from "@angular/forms";

export type ToAbstractFormControl<T> = {
    [key in keyof T]: AbstractControl<T[key]>
}