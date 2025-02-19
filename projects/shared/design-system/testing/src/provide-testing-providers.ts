import { provideHttpClient } from "@angular/common/http";
import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideIcons } from "@cooperl/design-system";
import { provideI18nTesting } from "@cooperl/i18n/testing";

export const provideTestingProviders = (): EnvironmentProviders => makeEnvironmentProviders([
  provideI18nTesting(),
  provideAnimationsAsync('noop'),
  provideIcons(),
  provideHttpClient()
]);
