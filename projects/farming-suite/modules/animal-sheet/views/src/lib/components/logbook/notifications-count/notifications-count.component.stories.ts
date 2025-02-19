import type { Meta, StoryObj } from '@storybook/angular';
import { NotificationsCountComponent } from './notifications-count.component';

const meta: Meta<NotificationsCountComponent> = {
  component: NotificationsCountComponent,
  title: 'Notifications/Count',
};
export default meta;
type Story = StoryObj<NotificationsCountComponent>;

export const Primary: Story = {
  args: {
    count: 2,
  },
};
