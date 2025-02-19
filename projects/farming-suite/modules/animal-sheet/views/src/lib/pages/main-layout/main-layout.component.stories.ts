import type { Meta, StoryObj } from '@storybook/angular';
import { MainLayoutComponent } from './main-layout.component';

const meta: Meta<MainLayoutComponent> = {
  component: MainLayoutComponent,
  title: 'Pages/Main Layout',
};
export default meta;
type Story = StoryObj<MainLayoutComponent>;

export const Primary: Story = {
  args: {},
};
