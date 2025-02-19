// see https://jgelin.medium.com/inject-angular-services-in-storybook-7-c26b7f5a41e5

import { APP_INITIALIZER, Injector } from "@angular/core";
import { AngularRenderer } from "@storybook/angular";
import { DecoratorFunction } from "storybook/internal/types";

export function injectInjectorToProps<TArgs = unknown>(): DecoratorFunction<AngularRenderer, TArgs> {
  return (storyFn) => {
    const story = storyFn();

    if (!story.applicationConfig) {
      story.applicationConfig = { providers: [] };
    }

    story.applicationConfig.providers.push({
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector) => (): void => {
        if (!story.props) {
          story.props = { injector };
        }
        Object.assign(story.props, { injector });
      },
      deps: [Injector],
      multi: true,
    });

    return story;
  };
}

// Example usage:
/**
  render: () => ({
    props: {
      openDialog: (injector: Injector) => {
        // the injector is provided by the template and all services are now available
        injector.get(MatDialogService).open(CustomDialogComponent);
      },
    },
    template: `
      <!-- Because the injector is part of the props, you can provide it to your function -->
      <button (click)="openDialog(injector)">Open dialog</button>
    `,
  }),
*/
