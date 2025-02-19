import type { Meta, StoryObj } from '@storybook/angular';
import { ExampleTableMoveableColumnsComponent } from "./example-table-moveable-columns.component";

const meta: Meta<ExampleTableMoveableColumnsComponent> = {
  component: ExampleTableMoveableColumnsComponent,
  title: 'How To/Table/With Moveable Columns',

  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<ExampleTableMoveableColumnsComponent>;

export const Default: Story = { };
