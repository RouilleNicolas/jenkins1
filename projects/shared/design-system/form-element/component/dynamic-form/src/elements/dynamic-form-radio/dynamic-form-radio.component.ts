import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Logger } from '@cooperl/logger';
import { NoopValueAccessorDirective } from '@cooperl/utils/form-control-forward';
import { TranslocoDirective } from '@jsverse/transloco';
import { DynamicFormControlSelectableItems } from '../abstracts/dynamic-form-control-selectable-items.abstract';
import { DynamicFormErrorsComponent } from '../dynamic-form-errors/dynamic-form-errors.component';
import { FormItemRadio, RadioItem } from './form-item-radio.interface';

@Component({
  selector: 'design-system-dynamic-form-radio',
  imports: [
    // Angular
    ReactiveFormsModule,
    KeyValuePipe,
    AsyncPipe,
    // External
    MatRadioModule,
    TranslocoDirective,
    // Internal
    DynamicFormErrorsComponent,
  ],
  hostDirectives: [NoopValueAccessorDirective],
  templateUrl: './dynamic-form-radio.component.html',
  styleUrl: './dynamic-form-radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormRadioComponent extends DynamicFormControlSelectableItems<FormItemRadio, RadioItem> {
  protected override _logger = new Logger('DynamicFormRadioComponent');
}
