import { ResourceRef, signal } from '@angular/core';
import { AnimalEventEnum, AnimalNotification, GetNotificationsDataUseCase } from '@cooperl/farming-suite/animal-sheet/domain';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { NotificationsSideContentComponent } from './notifications-side-content.component';

const FakeGetNotificationsDataUseCase: Partial<GetNotificationsDataUseCase> = {
  execute: () =>
    ({
      value: signal<AnimalNotification[]>([
        {
          eventType: AnimalEventEnum.NO_SLAUGHTERHOUSE,
          content: 'Abcès, boiterie',
          date: new Date(),
        },
        {
          eventType: AnimalEventEnum.OBSERVATION_CURRENT_CYCLE,
          content: 'Truie agressive',
          date: new Date(),
        },
        {
          eventType: AnimalEventEnum.OBSERVATION_CURRENT_CYCLE,
          content: 'Mise bas de nuit',
          date: new Date(),
        },
      ]),
    }) as ResourceRef<AnimalNotification[]>,
};

const meta: Meta<NotificationsSideContentComponent> = {
  component: NotificationsSideContentComponent,
  title: 'Notifications/Side Content',
  decorators: [
    applicationConfig({
      providers: [{ provide: GetNotificationsDataUseCase, useValue: FakeGetNotificationsDataUseCase }],
    }),
  ],
};
export default meta;
type Story = StoryObj<NotificationsSideContentComponent>;

export const Primary: Story = {
  args: {},
};
