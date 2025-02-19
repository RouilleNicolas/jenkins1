import { Component, computed, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { FormItemDivider } from './form-item-divider.interface';

@Component({
  selector: 'design-system-dynamic-form-divider',
  imports: [
    // Angular
    // External
    MatDividerModule,
    // Internal
  ],
  templateUrl: './dynamic-form-divider.component.html',
  styleUrl: './dynamic-form-divider.component.scss',
})
export class DynamicFormDividerComponent {
  public readonly element = input.required<FormItemDivider>();

  protected readonly style = computed(() => (this.element().vertical ? 'height: 100%' : ''));
}
