import { type Meta, type StoryObj } from '@storybook/angular';
import { InformationsBlockComponent } from './informations-block.component';

const meta: Meta<InformationsBlockComponent> = {
  component: InformationsBlockComponent,
  title: 'InformationsBlockComponent',
};
export default meta;
type Story = StoryObj<InformationsBlockComponent>;

export const Primary: Story = {
  args: {
    title: 'Titre du bloc',
    suffix: 'unit',
    isPercentValue : false,
    value: 30.5,
  },
};

export const WithoutSuffix: Story = {
  args: {
    title: 'Titre du bloc',
    isPercentValue : false,
    value: 30.5,
  },
};

export const WithPercentValue: Story = {
  args: {
    title: 'Titre du bloc',
    isPercentValue : true,
    value: 30.5,
  },
};
