import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Datum } from 'projects/shared/design-system/docs/tables/datum.interface';
import { TableFiltersService } from '../table-filters.service';
import { TableHeaderFilterTextComponent } from './table-header-filter-text.component';

const meta: Meta<TableHeaderFilterTextComponent<Datum>> = {
  component: TableHeaderFilterTextComponent,
  title: 'Components/Table Header Filters/Text',
  decorators: [
    moduleMetadata({
      providers: [TableFiltersService],
    }),
  ],
  argTypes: {
    filterChange: {
      action: 'filterChange',
    }
  },
  render: (args) => ({
    props: args,
    template: `
      <design-system-table-header-filter-text
        filterId="my-filter-id"
        filterExecutionMode="manual"
        (filterChange)="filterChange($event)"
        [label]="label"
        [placeholder]="placeholder"
      />
    `,
  }),
};
export default meta;
type Story = StoryObj<TableHeaderFilterTextComponent<Datum>>;

export const Default: Story = {
  args: {},
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
    },
  }
};

export const WithCustomLabel: Story = {
  args: {
    label: 'Custom label',
  }
};

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: 'Custom placeholder',
  }
};
