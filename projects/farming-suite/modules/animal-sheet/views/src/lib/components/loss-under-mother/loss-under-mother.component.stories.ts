import type { Meta, StoryObj } from '@storybook/angular';
import { LossUnderMotherComponent } from './loss-under-mother.component';

const meta: Meta<LossUnderMotherComponent> = {
  component: LossUnderMotherComponent,
  title: 'Career/Components/LossUnderMotherComponent',
};
export default meta;
type Story = StoryObj<LossUnderMotherComponent>;

export const Primary: Story = {
  args: {
    lossUnderMotherPercent: 0.8,
  },
};
