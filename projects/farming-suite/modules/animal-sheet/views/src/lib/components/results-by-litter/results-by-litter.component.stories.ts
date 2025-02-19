import type { Meta, StoryObj } from '@storybook/angular';
import { ResultsByLitterComponent } from './results-by-litter.component';

const meta: Meta<ResultsByLitterComponent> = {
  component: ResultsByLitterComponent,
  title: 'Career/Components/ResultsByLitterComponent',
};
export default meta;
type Story = StoryObj<ResultsByLitterComponent>;

export const Primary: Story = {
  args: {
    littersWeanedOnFarm: 10,
    bornAliveSum: 6,
    stillbornSum: 8,
    mummifiedSum: 4,
  },
};
