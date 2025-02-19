import { KeyValue, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslocoDirective } from '@jsverse/transloco';
import { DynamicFormElementComponent } from './elements/dynamic-form-element.component';
import { DynamicFormResponse } from './interfaces/dynamic-form-response.interface';
import { FormItem, FormItemType } from './interfaces/elements/form-item.interface';
import { isFormField } from './types-guards';

@Component({
  selector: 'design-system-dynamic-form',
  imports: [
    // Angular
    KeyValuePipe,
    ReactiveFormsModule,
    // External
    MatGridListModule,
    MatButtonModule,
    TranslocoDirective,
    // Internal
    DynamicFormElementComponent,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit {
  public readonly elements = input.required<DynamicFormResponse['items']>();

  public readonly submitted = output<object>();

  protected readonly formGroup = inject(FormBuilder).group({});
  protected readonly columns = computed(() => {
    // Count every element on each y position
    const columns = Object.values(this.elements()).reduce(
      (acc, element) => {
        acc[element.position.y] = acc[element.position.y] + 1 || 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    // Return the maximum number of elements on a single y position
    return Math.max(...Object.values(columns));
  });

  private readonly _formBuilder = inject(FormBuilder);

  public ngOnInit(): void {
    this._initializeForm();
  }

  protected orderByPosition(a: KeyValue<string, FormItem<FormItemType>>, b: KeyValue<string, FormItem<FormItemType>>): number {
    if (a.value.position.y === b.value.position.y) {
      return a.value.position.x - b.value.position.x;
    }
    return a.value.position.y - b.value.position.y;
  }

  private _initializeForm(): void {
    const elements = this.elements();
    for (const [key, value] of Object.entries(elements)) {
      if (isFormField(value)) {
        const control = this._formBuilder.control(null);
        this.formGroup.addControl(key, control);
      }
    }
  }
}
