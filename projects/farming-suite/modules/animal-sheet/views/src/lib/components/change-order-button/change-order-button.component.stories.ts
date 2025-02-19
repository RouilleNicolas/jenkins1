import type { Meta, StoryObj } from '@storybook/angular';
import { ChangeOrderButtonComponent } from './change-order-button.component';

const meta: Meta<ChangeOrderButtonComponent> = {
  component: ChangeOrderButtonComponent,
  title: 'Buttons/Change Order',
};
export default meta;
type Story = StoryObj<ChangeOrderButtonComponent>;

export const Primary: Story = {
  args: {},
};
