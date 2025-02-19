import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { isBefore, isSameDay, isSameMonth, isSameYear } from 'date-fns';

interface Options {
  // 'open' means that the max date is not included. Default is 'close'.
  interval?: 'open' | 'close';
  compareOn?: 'day' | 'month' | 'year';
}

const defaultOptions: Options = {
  interval: 'close',
  compareOn: 'day'
}

export function maxDate(maxDate: Date, options = defaultOptions): ValidatorFn {
  const sanitizedOptions = { ...defaultOptions, ...options };

  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = sanitizedOptions?.interval === 'close' ? isClosedSameOrBefore : isOpenedSameOrBefore;

    if (!isValid(sanitizedOptions?.compareOn, control.value, maxDate)) {
      return generateError(control.value, maxDate);
    }

    return null;
  };
}

function isClosedSameOrBefore(compareOn: Options['compareOn'], controlValue: Date, maxDate: Date): boolean {
  switch (compareOn) {
    case 'day':
      return isSameDay(controlValue, maxDate) || isBefore(controlValue, maxDate);
    case 'month':
      return isSameMonth(controlValue, maxDate) || isBefore(controlValue, maxDate);
    case 'year':
      return isSameYear(controlValue, maxDate) || isBefore(controlValue, maxDate);
    default:
      return true;
  }
}

function isOpenedSameOrBefore(compareOn: Options['compareOn'], controlValue: Date, maxDate: Date): boolean {
  switch (compareOn) {
    case 'day':
      return !isSameDay(controlValue, maxDate) && isBefore(controlValue, maxDate);
    case 'month':
      return !isSameMonth(controlValue, maxDate) && isBefore(controlValue, maxDate);
    case 'year':
      return !isSameYear(controlValue, maxDate) && isBefore(controlValue, maxDate);
    default:
      return true;
  }
}

function generateError(actualDate: Date, maxDate: Date): ValidationErrors {
  return {
    maxDate: {
      actual: actualDate,
      max: maxDate
    }
  };
}
