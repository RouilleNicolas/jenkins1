import type { Meta, StoryObj } from '@storybook/angular';
import { StartCareerComponent } from './start-career.component';

const meta: Meta<StartCareerComponent> = {
  component: StartCareerComponent,
  title: 'Career/Components/StartCareerComponent',
};

export default meta;
type Story = StoryObj<StartCareerComponent>;

export const Primary: Story = {
  args: {
    firstGivingBirth: new Date(),
    firstIA: new Date(),
  },
};
