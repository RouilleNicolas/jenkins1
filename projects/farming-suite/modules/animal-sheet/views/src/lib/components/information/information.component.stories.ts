import type { Meta, StoryObj } from '@storybook/angular';
import { InformationComponent } from './information.component';

const meta: Meta<InformationComponent> = {
  component: InformationComponent,
  title: 'InformationComponent',
};
export default meta;
type Story = StoryObj<InformationComponent>;

export const Primary: Story = {
  args: {
    title: 'Title',
    content: 'Information',
  },
};
