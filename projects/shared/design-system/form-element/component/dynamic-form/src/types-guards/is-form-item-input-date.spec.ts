import { DateType } from "../elements/inputs/dynamic-form-input-date/form-item-input-date.interface";
import { FormItemInput, InputType } from "../elements/inputs/form-item-input.interface";
import { FormItemType } from "../interfaces/elements/form-item.interface";
import { Position } from "../interfaces/elements/position.interface";
import { isFormItemInputDate } from "./is-form-item-input-date";

const formTypes: FormItemType[] = ['input', 'button', 'checkbox', 'divider', 'label', 'radio', 'select'];
const inputDateTypes: InputType[] = ['date', 'datetime-local', 'month', 'time', 'week'];
const inputTypes: InputType[] = ['color', 'text', 'email', 'number', 'password', 'search', 'tel', 'url', ...inputDateTypes];
const dateTypes: DateType[] = ['simple', 'multiple', 'range'];
const simpleDateTypes: DateType[] = ['simple', 'multiple'];
const position: Position = { x: 0, y: 0 };

describe('isFormItemInputDate', () => {
  generateFormItemTypesTestCases();
});

/** All test specific for the date input types */
function generateDateTypesTestCases() {
  const dateTypesTestCases = dateTypes.map(dateType => ({ formItem: { type: 'input', inputType: 'date', date: { dateType }, position }, expected: simpleDateTypes.includes(dateType) }));
  for (const testCase of dateTypesTestCases) {
    it(`should return ${testCase.expected} when dateType is ${testCase.formItem.date.dateType}`, () => {
      expect(isFormItemInputDate(testCase.formItem as FormItemInput)).toBe(testCase.expected);
    });
  }
}

/** All test specific for the input types */
function generateInputTypesTestCases() {
  const inputTypesTestCases = inputTypes.map(inputType => ({ formItem: { type: 'input', inputType, position, date: inputDateTypes.includes(inputType) ? {} : undefined }, expected: inputDateTypes.includes(inputType) }));

  // All input types except 'date' should return false
  for (const testCase of inputTypesTestCases) {
    describe(`Input type is "${testCase.formItem.inputType}"`, () => {
      const message = `should return ${testCase.expected}`;
      const noDateTypeMessage = `${message} when there is no date.dateType`;

      it(inputDateTypes.includes(testCase.formItem.inputType) ? noDateTypeMessage : message, () => {
        expect(isFormItemInputDate(testCase.formItem as FormItemInput)).toBe(testCase.expected);
      });

      if (inputDateTypes.includes(testCase.formItem.inputType)) {
        generateDateTypesTestCases();
      }
    });
  }
}

/** All test specific for the form item types */
function generateFormItemTypesTestCases() {
  const formTypesTestCases = formTypes.map(type => ({ formItem: { type, position } }));
  // All form item types except 'input' should return false
  for (const testCase of formTypesTestCases) {
    describe(`Form item type is "${testCase.formItem.type}"`, () => {
      const message = "should return false";
      const inputMessage = `${message} where there is no inputType and no date.dateType`;

      // Should return false if missing mandatory properties
      it(testCase.formItem.type === 'input' ? inputMessage : message, () => {
        expect(isFormItemInputDate(testCase.formItem as FormItemInput)).toBe(false);
      });

      if (testCase.formItem.type === 'input') {
        generateInputTypesTestCases();
      }
    });
  }
}
