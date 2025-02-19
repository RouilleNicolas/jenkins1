import type { Meta, StoryObj } from '@storybook/angular';
import { InformationCardComponent } from './information-card.component';

const meta: Meta<InformationCardComponent> = {
  component: InformationCardComponent,
  title: 'Career/Components/InformationCardComponent',
};
export default meta;
type Story = StoryObj<InformationCardComponent>;

export const Primary: Story = {
  args: {
    value: 15,
    subtitle: 'Subtitle',
    suffix: 'Suffix',
  },
};

export const WithoutSuffix: Story = {
  args: {
    value: 15,
    subtitle: 'Subtitle',
  },
};

export const WithStringValue: Story = {
  args: {
    value: '15 J.',
    subtitle: 'Subtitle',
  },
};
