import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { isAfter, isSameDay, isSameMonth, isSameYear } from 'date-fns';

interface Options {
  // 'open' means that the min date is not included. Default is 'close'.
  interval?: 'open' | 'close';
  compareOn?: 'day' | 'month' | 'year';
}

const defaultOptions: Options = {
  interval: 'close',
  compareOn: 'day'
}

export function minDate(minDate: Date, options = defaultOptions): ValidatorFn {
  const sanitizedOptions = { ...defaultOptions, ...options };

  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = sanitizedOptions?.interval === 'close' ? isClosedSameOrAfter : isOpenedSameOrAfter;

    if (!isValid(sanitizedOptions?.compareOn, control.value, minDate)) {
      return generateError(control.value, minDate);
    }

    return null;
  };
}

function isClosedSameOrAfter(compareOn: Options['compareOn'], controlValue: Date, minDate: Date): boolean {
  switch (compareOn) {
    case 'day':
      return isSameDay(controlValue, minDate) || isAfter(controlValue, minDate);
    case 'month':
      return isSameMonth(controlValue, minDate) || isAfter(controlValue, minDate);
    case 'year':
      return isSameYear(controlValue, minDate) || isAfter(controlValue, minDate);
    default:
      return true;
  }
}

function isOpenedSameOrAfter(compareOn: Options['compareOn'], controlValue: Date, minDate: Date): boolean {
  switch (compareOn) {
    case 'day':
      return !isSameDay(controlValue, minDate) && isAfter(controlValue, minDate);
    case 'month':
      return !isSameMonth(controlValue, minDate) && isAfter(controlValue, minDate);
    case 'year':
      return !isSameYear(controlValue, minDate) && isAfter(controlValue, minDate);
    default:
      return true;
  }
}

function generateError(actualDate: Date, minDate: Date): ValidationErrors {
  return {
    minDate: {
      actual: actualDate,
      min: minDate
    }
  };
}
