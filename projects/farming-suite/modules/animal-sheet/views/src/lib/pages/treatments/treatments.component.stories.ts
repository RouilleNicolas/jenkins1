import type { Meta, StoryObj } from '@storybook/angular';
import { TreatmentsPageComponent } from './treatments.component';

const meta: Meta<TreatmentsPageComponent> = {
  component: TreatmentsPageComponent,
  title: 'Pages/Treatments',
};
export default meta;
type Story = StoryObj<TreatmentsPageComponent>;

export const Primary: Story = {
  args: {},
};
