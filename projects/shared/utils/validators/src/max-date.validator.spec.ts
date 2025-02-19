import { FormControl } from '@angular/forms';
import { addDays, addMonths, addYears, subDays, subMonths, subYears } from 'date-fns';
import { maxDate } from './max-date.validator';

describe('maxDate Validator', () => {
  const today = new Date();

  describe('opened interval', () => {
    describe('day comparison', () => {
      it('should return null if the date is before the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'close' });
        // And a control with a date after the max date
        const control = new FormControl(subDays(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be null
        expect(result).toBeNull();
      });

      it('should return an error if the date is the same as the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'open' });
        // And a control with a date the same as the max date
        const control = new FormControl(today);

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be an error
        expect(result).toEqual({
          maxDate: {
            actual: today,
            max: today
          }
        });
      });

      it('should return an error if the date is after the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'open' });
        // And a control with a date after the max date
        const control = new FormControl(addDays(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be an error
        expect(result).toEqual({
          maxDate: {
            actual: addDays(today, 1),
            max: today
          }
        });
      });
    });

    describe('month comparison', () => {
      it('should return null if the date is before the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'open', compareOn: 'month' });
        // And a control with a date after the max date
        const control = new FormControl(subMonths(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be null
        expect(result).toBeNull();
      });

      it('should return an error if the date is the same as the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'open', compareOn: 'month' });
        // And a control with a date the same as the max date
        const control = new FormControl(today);

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be an error
        expect(result).toEqual({
          maxDate: {
            actual: today,
            max: today
          }
        });
      });

      it('should return an error if the date is after the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'open', compareOn: 'month' });
        // And a control with a date after the max date
        const control = new FormControl(addMonths(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be an error
        expect(result).toEqual({
          maxDate: {
            actual: addMonths(today, 1),
            max: today
          }
        });
      });
    });

    describe('year comparison', () => {
      it('should return null if the date is before the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'open', compareOn: 'year' });
        // And a control with a date after the max date
        const control = new FormControl(subYears(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be null
        expect(result).toBeNull();
      });

      it('should return an error if the date is the same as the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'open', compareOn: 'year' });
        // And a control with a date the same as the max date
        const control = new FormControl(today);

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be an error
        expect(result).toEqual({
          maxDate: {
            actual: today,
            max: today
          }
        });
      });

      it('should return an error if the date is after the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'open', compareOn: 'year' });
        // And a control with a date after the max date
        const control = new FormControl(addYears(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be an error
        expect(result).toEqual({
          maxDate: {
            actual: addYears(today, 1),
            max: today
          }
        });
      });
    });

    describe('invalid comparison', () => {
      it('should return null if the comparison is invalid', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'open', compareOn: 'invalid' as any });
        // And a control with a date after the max date
        const control = new FormControl(subDays(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be null
        expect(result).toBeNull();
      });
    });
  });

  describe('closed interval', () => {
    describe('day comparison', () => {
      it('is the default behavior', () => {
        // Given a validator function
        const validatorFn = maxDate(today);
        // And a control with a date after the min date
        const control = new FormControl(subDays(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be null
        expect(result).toBeNull();
      });

      it('should return null if the date is before the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'close' });
        // And a control with a date after the max date
        const control = new FormControl(subDays(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be null
        expect(result).toBeNull();
      });

      it('should return null if the date is the same as the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'close' });
        // And a control with a date the same as the max date
        const control = new FormControl(today);

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be an error
        expect(result).toBeNull();
      });

      it('should return an error if the date is after the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'close' });
        // And a control with a date after the max date
        const control = new FormControl(addDays(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be an error
        expect(result).toEqual({
          maxDate: {
            actual: addDays(today, 1),
            max: today
          }
        });
      });
    });

    describe('month comparison', () => {
      it('should return null if the date is before the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'close', compareOn: 'month' });
        // And a control with a date after the max date
        const control = new FormControl(subMonths(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be null
        expect(result).toBeNull();
      });

      it('should return null if the date is the same as the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'close', compareOn: 'month' });
        // And a control with a date the same as the max date
        const control = new FormControl(today);

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be an error
        expect(result).toBeNull();
      });

      it('should return an error if the date is after the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'close', compareOn: 'month' });
        // And a control with a date after the max date
        const control = new FormControl(addMonths(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be an error
        expect(result).toEqual({
          maxDate: {
            actual: addMonths(today, 1),
            max: today
          }
        });
      });
    });

    describe('year comparison', () => {
      it('should return null if the date is before the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'close', compareOn: 'year' });
        // And a control with a date after the max date
        const control = new FormControl(subYears(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be null
        expect(result).toBeNull();
      });

      it('should return null if the date is the same as the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'close', compareOn: 'year' });
        // And a control with a date the same as the max date
        const control = new FormControl(today);

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be an error
        expect(result).toBeNull();
      });

      it('should return an error if the date is after the max date', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'close', compareOn: 'year' });
        // And a control with a date after the max date
        const control = new FormControl(addYears(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be an error
        expect(result).toEqual({
          maxDate: {
            actual: addYears(today, 1),
            max: today
          }
        });
      });
    });

    describe('invalid comparison', () => {
      it('should return null if the comparison is invalid', () => {
        // Given a validator function
        const validatorFn = maxDate(today, { interval: 'close', compareOn: 'invalid' as any });
        // And a control with a date after the max date
        const control = new FormControl(subDays(today, 1));

        // When the validator function is called
        const result = validatorFn(control);

        // Then the result should be null
        expect(result).toBeNull();
      });
    });
  });
});
