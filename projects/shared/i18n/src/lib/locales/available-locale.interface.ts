import { Locale } from 'date-fns/types';

export interface AvailableLocale {
  dateFnsLocaleData: () => Promise<Locale>;
  angularLocaleData: () => Promise<unknown>;
}
