import { maxDate } from './max-date.validator';
import { minDate } from './min-date.validator';
import { textSize } from './text-size.validator';

export const InternalValidators = {
  date: {
    min: minDate,
    max: maxDate,
  },
  text: {
    size: textSize,
  }
}
