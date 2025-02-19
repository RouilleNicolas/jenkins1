import type { Meta, StoryObj } from '@storybook/angular';
import { CareerPageComponent } from './career.component';

const meta: Meta<CareerPageComponent> = {
  component: CareerPageComponent,
  title: 'Career/Page',
};
export default meta;
type Story = StoryObj<CareerPageComponent>;

export const Primary: Story = {
  args: {},
};
