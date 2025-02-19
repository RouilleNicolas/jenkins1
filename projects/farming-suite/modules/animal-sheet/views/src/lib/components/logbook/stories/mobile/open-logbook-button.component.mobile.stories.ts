import { Component } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { Backgrounds } from '@cooperl/design-system/testing';
import { GetNotificationsCountUseCase, GetNotificationsDataUseCase } from '@cooperl/farming-suite/animal-sheet/domain';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { OpenLogbookButtonComponent } from '../../open-logbook-button.component';
import {
  FakeGetNotificationsCountUseCaseWithNoNotifications,
  FakeGetNotificationsCountUseCaseWithNotifications,
  FakeGetNotificationsDataUseCase,
} from '../fakes';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- We don't need to use the component in the app
  selector: 'storybook-open-logbook-button-mobile-wrapper',
  imports: [
    // Angular
    // External
    MatBottomSheetModule,
    // Internal
    OpenLogbookButtonComponent,
  ],
  template: `
    <h1>Page content</h1>
    <p>Click the button to open the notifications bottom sheet</p>
    <farming-suite-animal-sheet-open-logbook-button testId="open-notifications-btn" />
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
        color: white;
      }
    `,
  ],
})
class WrapperComponent {}

const meta: Meta<WrapperComponent> = {
  component: WrapperComponent,
  title: 'Logbook/Button/Mobile',
  parameters: {
    viewport: { defaultViewport: 'iphone14promax' },
    backgrounds: {
      default: Backgrounds.Header,
    },
  },
};
export default meta;
type Story = StoryObj<WrapperComponent>;

export const WithNotifications: Story = {
  decorators: [
    applicationConfig({
      providers: [
        { provide: GetNotificationsCountUseCase, useValue: FakeGetNotificationsCountUseCaseWithNotifications },
        { provide: GetNotificationsDataUseCase, useValue: FakeGetNotificationsDataUseCase },
      ],
    }),
  ],
};

export const WithNoNotifications: Story = {
  decorators: [
    applicationConfig({
      providers: [{ provide: GetNotificationsCountUseCase, useValue: FakeGetNotificationsCountUseCaseWithNoNotifications }],
    }),
  ],
};
