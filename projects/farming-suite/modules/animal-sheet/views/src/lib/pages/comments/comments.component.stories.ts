import type { Meta, StoryObj } from '@storybook/angular';
import { CommentsPageComponent } from './comments.component';

const meta: Meta<CommentsPageComponent> = {
  component: CommentsPageComponent,
  title: 'Pages/Comments',
};
export default meta;
type Story = StoryObj<CommentsPageComponent>;

export const Primary: Story = {
  args: {},
};
