import type { Meta, StoryObj } from '@storybook/angular';
import { GeneralPageComponent } from './general.component';

const meta: Meta<GeneralPageComponent> = {
  component: GeneralPageComponent,
  title: 'Pages/General',
};
export default meta;
type Story = StoryObj<GeneralPageComponent>;

export const Primary: Story = {
  args: {},
};
