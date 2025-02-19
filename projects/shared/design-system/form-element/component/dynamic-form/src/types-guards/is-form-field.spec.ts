import { FormItemType } from "../interfaces/elements/form-item.interface";
import { Position } from "../interfaces/elements/position.interface";
import { isFormField } from "./is-form-field";

const formTypes: FormItemType[] = ['input', 'button', 'checkbox', 'divider', 'label', 'radio', 'select'];
const formFields: FormItemType[] = ['input', 'checkbox', 'radio', 'select'];
const position: Position = { x: 0, y: 0 };

describe('isFormField', () => {
  const testCases = formTypes.map(type => ({ formItem: { type, position }, expected: formFields.includes(type) }));

  for (const testCase of testCases) {
    it(`should return ${testCase.expected} for input.type="${testCase.formItem.type}"`, () => {
      expect(isFormField(testCase.formItem)).toBe(testCase.expected);
    });
  }
});
