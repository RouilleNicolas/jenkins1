// eslint-disable-next-line no-restricted-imports -- This is a wrapper around the external library
import { Logger as ExternalLogger, ISettingsParam } from 'tslog';

export class Logger<LogObj> extends ExternalLogger<LogObj> {
  public constructor(name: string, settings?: Omit<ISettingsParam<LogObj>, 'name' | 'hideLogPositionForProduction'>, logObj?: LogObj) {
    const loggerSettings: ISettingsParam<LogObj> = {
      name,
      hideLogPositionForProduction: true,
      ...settings,
    };

    super(loggerSettings, logObj);
  }
}
