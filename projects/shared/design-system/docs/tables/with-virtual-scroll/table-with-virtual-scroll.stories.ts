import type { Meta, StoryObj } from '@storybook/angular';
import { ExampleTableVirtualScrollComponent } from './example-table-virtual-scroll.component';

const meta: Meta<ExampleTableVirtualScrollComponent> = {
  component: ExampleTableVirtualScrollComponent,
  title: 'How To/Table/With Virtual Scroll',

  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<ExampleTableVirtualScrollComponent>;

export const Default: Story = { };
