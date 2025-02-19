import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BackgroundParameters, ViewportsParameters } from '@cooperl/design-system/testing';
import { provideI18n } from '@cooperl/i18n';
import { applicationConfig, Preview } from '@storybook/angular';
import { provideIcons } from '../src/provide-icons';
import { injectInjectorToProps } from './helpers/inject-injector-to-props';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    ...BackgroundParameters,
    ...ViewportsParameters,
  },

  tags: ['autodocs'],

  decorators: [
    // Angular application specific configuration
    applicationConfig({
      providers: [provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync(), provideI18n(), provideDateFnsAdapter(), provideIcons()],
    }),
    injectInjectorToProps(),
  ],
};

export default preview;
