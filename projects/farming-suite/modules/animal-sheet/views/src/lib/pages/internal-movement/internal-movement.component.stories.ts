import type { Meta, StoryObj } from '@storybook/angular';
import { InternalMovementPageComponent } from './internal-movement.component';

const meta: Meta<InternalMovementPageComponent> = {
  component: InternalMovementPageComponent,
  title: 'Pages/InternalMovement',
};
export default meta;
type Story = StoryObj<InternalMovementPageComponent>;

export const Primary: Story = {
  args: {},
};
