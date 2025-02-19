import { Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { FormItem, FormItemType } from '../interfaces/elements/form-item.interface';
import { DynamicFormButtonComponent } from './dynamic-form-button/dynamic-form-button.component';
import { DynamicFormCheckboxComponent } from './dynamic-form-checkbox/dynamic-form-checkbox.component';
import { DynamicFormDividerComponent } from './dynamic-form-divider/dynamic-form-divider.component';
import { DynamicFormElementComponent } from './dynamic-form-element.component';
import { DynamicFormLabelComponent } from './dynamic-form-label/dynamic-form-label.component';
import { DynamicFormRadioComponent } from './dynamic-form-radio/dynamic-form-radio.component';
import { FormItemRadio } from './dynamic-form-radio/form-item-radio.interface';
import { DynamicFormSelectComponent } from './dynamic-form-select/dynamic-form-select.component';
import { DynamicFormInputDateRangeComponent } from './inputs/dynamic-form-input-date-range/dynamic-form-input-date-range.component';
import { DynamicFormInputDateComponent } from './inputs/dynamic-form-input-date/dynamic-form-input-date.component';
import { DateType, FormItemInputDate } from './inputs/dynamic-form-input-date/form-item-input-date.interface';
import { DynamicFormInputNumberComponent } from './inputs/dynamic-form-input-number/dynamic-form-input-number.component';
import { FormItemInputNumber } from './inputs/dynamic-form-input-number/form-item-input-number.interface';
import { DynamicFormInputTextComponent } from './inputs/dynamic-form-input-text/dynamic-form-input-text.component';
import { FormItemInput, InputType } from './inputs/form-item-input.interface';

interface TestCase {
  type: FormItemType;
  component: Type<unknown>;
  name: string;
  inputType?: InputType;
  dateType?: DateType;
}

const dateInputTypes: InputType[] = ['date', 'datetime-local', 'month', 'time', 'week'];

describe('DynamicFormElementComponent', () => {
  describe('Unit Tests', () => {
    describe('Displayed component', () => {
      const testCases: TestCase[] = [
        { type: 'button', component: DynamicFormButtonComponent, name: 'button' },
        { type: 'divider', component: DynamicFormDividerComponent, name: 'divider' },
        { type: 'checkbox', component: DynamicFormCheckboxComponent, name: 'checkbox' },
        // --- Inputs
        // Dates
        ...generateDateTests(),
        // Numbers
        { type: 'input', component: DynamicFormInputNumberComponent, name: 'input number', inputType: 'number' },
        // Texts
        { type: 'input', component: DynamicFormInputTextComponent, name: 'input text', inputType: 'text' },
        { type: 'input', component: DynamicFormInputTextComponent, name: 'input text', inputType: 'color' },
        { type: 'input', component: DynamicFormInputTextComponent, name: 'input text', inputType: 'email' },
        { type: 'input', component: DynamicFormInputTextComponent, name: 'input text', inputType: 'password' },
        { type: 'input', component: DynamicFormInputTextComponent, name: 'input text', inputType: 'tel' },
        { type: 'input', component: DynamicFormInputTextComponent, name: 'input text', inputType: 'url' },
        // Defaulted
        { type: 'input', component: DynamicFormInputTextComponent, name: 'input text' },
        { type: 'input', component: DynamicFormInputTextComponent, name: 'input text', inputType: 'not handled' as InputType },
        // --- End Inputs
        { type: 'label', component: DynamicFormLabelComponent, name: 'label' },
        { type: 'radio', component: DynamicFormRadioComponent, name: 'radio' },
        { type: 'select', component: DynamicFormSelectComponent, name: 'select' },
        // Defaulted
        { type: 'defaulted' as FormItemType, component: DynamicFormInputTextComponent, name: 'input text' },
      ];

      for (const { type, component, name, inputType, dateType } of testCases) {
        it(computeTitle(type, name, inputType, dateType), async () => {
          // Given a form element with a type
          const element: FormItem<FormItemType> = {
            type: type as FormItemType,
            position: { x: 0, y: 0 },
          };

          if (type === 'input') {
            (element as FormItemInput).inputType = inputType;
          }

          if (type === 'input' && dateInputTypes.includes(inputType as InputType)) {
            (element as FormItemInputDate<DateType>).date = { dateType: dateType };
          }

          if (type === 'input' && inputType === 'number') {
            (element as FormItemInputNumber).number = {};
          }

          if (type === 'radio' || type === 'select') {
            (element as FormItemRadio).options = {};
          }

          // When the component is instantiated
          const { fixture } = await renderElement(DynamicFormElementComponent, { inputs: { element } });
          const instantiatedComponent = fixture.debugElement.query(By.directive(component)).componentInstance;

          // Then the correct component should be displayed
          expect(instantiatedComponent).toBeInstanceOf(component);
        });
      }
    });
  });
});

function computeTitle(type: FormItemType, name: string, inputType: InputType | undefined, dateType: DateType | undefined): string {
  const base = `should display ${name} component when element is "${type}" type`;

  if (type !== 'input') {
    return base;
  }

  const baseInput = `${base} and input type is "${inputType}"`;

  if (!dateType) {
    return baseInput;
  }

  return `${baseInput} and date type is "${dateType}"`;
}

function generateDateTests(): TestCase[] {
  const dateTypes: DateType[] = ['simple', 'multiple', 'range', 'not handled' as DateType, undefined as unknown as DateType];

  const testCases: TestCase[] = [];

  for (const dateInputType of dateInputTypes) {
    for (const dateType of dateTypes) {
      let name = 'date';

      if (dateType === 'range') {
        name += ' range';
      }

      const component = dateType === 'range' ? DynamicFormInputDateRangeComponent : DynamicFormInputDateComponent;

      testCases.push({ type: 'input', component, name, inputType: dateInputType, dateType });
    }
  }

  return testCases;
}
