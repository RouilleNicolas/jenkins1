import { MatMenuModule } from '@angular/material/menu';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { TableFiltersService } from '../table-filters.service';
import { TableHeaderFilterWrapperComponent } from './table-header-filter-wrapper.component';

const meta: Meta<TableHeaderFilterWrapperComponent> = {
  component: TableHeaderFilterWrapperComponent,
  title: 'Components/Table Header Filters/Wrapper',
  decorators: [
    moduleMetadata({
      imports: [MatMenuModule],
      providers: [TableFiltersService],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
<design-system-table-header-filter-wrapper filterId="my-filter-id" testId="custom-filter-wrapper">
    <p mat-menu-item>You can put whatever you want here</p>
</design-system-table-header-filter-wrapper>`,
  }),
};
export default meta;
type Story = StoryObj<TableHeaderFilterWrapperComponent>;

export const Default: Story = {};

export const WithActiveFilter: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: TableFiltersService,
          useFactory: () => {
            const service = new TableFiltersService();
            service.registerFilters({ key: 'my-filter-id', filterFn: () => true });
            return service;
          },
        },
      ],
    }),
  ],
};
