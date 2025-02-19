import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Datum } from 'projects/shared/design-system/docs/tables/datum.interface';
import { TableFiltersService } from '../table-filters.service';
import { TableHeaderFilterCheckboxGroupComponent } from './table-header-filter-checkbox-group.component';

const meta: Meta<TableHeaderFilterCheckboxGroupComponent<Datum, string>> = {
  component: TableHeaderFilterCheckboxGroupComponent,
  title: 'Components/Table Header Filters/Checkbox Group',
  decorators: [
    moduleMetadata({
      providers: [TableFiltersService],
    }),
  ],
  argTypes: {
    selectionChange: {
      action: 'selectionChange',
    }
  },
  render: (args) => ({
    props: args,
    template: `
      <design-system-table-header-filter-checkbox-group
        filterId="my-filter-id"
        filterExecutionMode="manual"
        [data]="data"
        (selectionChange)="selectionChange($event)"
      />
    `,
  }),
};
export default meta;
type Story = StoryObj<TableHeaderFilterCheckboxGroupComponent<Datum, string>>;

export const Default: Story = {
  args: {
    data: ['Value 1', 'Value 2', 'Value 3'],
  }
};

export const WithPreselectedValues: Story = {
  args: {
    data: [
      { id: '0', label: 'Value 1', value: 'value-1', selected: true },
      { id: '1', label: 'Value 2', value: 'value-2', selected: false },
      { id: '2', label: 'Value 3', value: 'value-3', selected: true },
    ],
  }
};
