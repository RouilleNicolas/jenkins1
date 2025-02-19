import { FormControl } from "@angular/forms";
import { textSize } from "./text-size.validator";

describe('textSize', () => {
  it('should return null if the control value length matches the required size', () => {
    const validator = textSize(5);
    const control = new FormControl('12345');
    expect(validator(control)).toBeNull();
  });

  it('should return a validation error if the control value length is less than the required size', () => {
    const validator = textSize(5);
    const control = new FormControl('1234');
    expect(validator(control)).toEqual({
      'text-size': {
        actual: 4,
        required: 5
      }
    });
  });

  it('should return a validation error if the control value length is more than the required size', () => {
    const validator = textSize(5);
    const control = new FormControl('123456');
    expect(validator(control)).toEqual({
      'text-size': {
        actual: 6,
        required: 5
      }
    });
  });

  it('should return a validation error if the control value is null', () => {
    const validator = textSize(5);
    const control = new FormControl(null);
    expect(validator(control)).toEqual({
      'text-size': {
        actual: undefined,
        required: 5
      }
    });
  });

  it('should return a validation error if the control value is undefined', () => {
    const validator = textSize(5);
    const control = new FormControl(undefined);
    expect(validator(control)).toEqual({
      'text-size': {
        actual: undefined,
        required: 5
      }
    });
  });
});
