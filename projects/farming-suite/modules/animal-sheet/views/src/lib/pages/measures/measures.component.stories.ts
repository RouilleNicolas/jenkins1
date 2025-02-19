import type { Meta, StoryObj } from '@storybook/angular';
import { MeasuresPageComponent } from './measures.component';

const meta: Meta<MeasuresPageComponent> = {
  component: MeasuresPageComponent,
  title: 'Pages/Measures',
};
export default meta;
type Story = StoryObj<MeasuresPageComponent>;

export const Primary: Story = {
  args: {},
};
