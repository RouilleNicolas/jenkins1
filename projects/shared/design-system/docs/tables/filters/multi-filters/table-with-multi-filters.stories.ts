import type { Meta, StoryObj } from '@storybook/angular';
import { ExampleTableWithMultiFiltersComponent } from "./example-table-with-multi-filters.component";

const meta: Meta<ExampleTableWithMultiFiltersComponent> = {
  component: ExampleTableWithMultiFiltersComponent,
  title: 'How To/Table/Filters/Multiple',

  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<ExampleTableWithMultiFiltersComponent>;

export const Default: Story = { };
