import type { Meta, StoryObj } from '@storybook/angular';
import { AnnualProductionComponent } from './annual-production.component';

const meta: Meta<AnnualProductionComponent> = {
  component: AnnualProductionComponent,
  title: 'Career/Components/AnnualProductionComponent',
};
export default meta;
type Story = StoryObj<AnnualProductionComponent>;

export const Primary: Story = {
  args: {
    value: 15.6,
  },
};
