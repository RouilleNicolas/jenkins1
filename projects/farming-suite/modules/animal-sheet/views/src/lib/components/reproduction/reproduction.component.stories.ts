import type { Meta, StoryObj } from '@storybook/angular';
import { ReproductionComponent } from './reproduction.component';

const meta: Meta<ReproductionComponent> = {
  component: ReproductionComponent,
  title: 'Career/Components/ReproductionComponent',
};
export default meta;
type Story = StoryObj<ReproductionComponent>;

export const Primary: Story = {
  args: {
    abortionNumber: 5,
    averageGestationLength: 116,
    averageLactationLength: 19,
    farrowingInterval: 145,
    intervalWeaningFertilizingService: 4.6,
    returnNumber: 0,
  },
};
