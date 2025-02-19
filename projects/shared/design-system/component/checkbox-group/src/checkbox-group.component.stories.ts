import { JsonPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { type Meta, type StoryObj } from '@storybook/angular';
import { CheckboxGroupDatum } from './checkbox-group-datum.interface';
import { CheckboxGroupComponent } from './checkbox-group.component';

const data = Array.from<unknown, CheckboxGroupDatum<string>>({ length: 5 }, (_, index) => ({
  id: (index + 1).toString(),
  value: index.toString(),
  label: `Option ${index + 1}`,
}));
const meta: Meta<CheckboxGroupComponent<string>> = {
  component: CheckboxGroupComponent,
  title: 'Components/Checkbox Group',
  args: {
    data,
    orientation: 'horizontal', // This is the default value defined in the component,
  },
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <design-system-checkbox-group
          [data]="data"
          [orientation]="orientation"
          [checkboxesClasses]="checkboxesClasses"
          [checkboxContainerClasses]="checkboxContainerClasses"
          [withMasterCheckbox]="withMasterCheckbox"
          [masterCheckboxLabel]="masterCheckboxLabel"
          [masterCheckboxClasses]="masterCheckboxClasses"
          testId="checkbox-group"
      />
    `,
  }),
};
export default meta;
type Story = StoryObj<CheckboxGroupComponent<string>>;

export const Default: Story = {
  argTypes: {
    data: {
      control: { type: 'object' },
    },
    masterCheckboxLabel: {
      control: { type: 'text' },
    },
    withMasterCheckbox: {
      control: { type: 'boolean' },
    },
    orientation: {
      control: { type: 'radio' },
    },
  },
};

export const WithSelectedOptions: Story = {
  args: {
    data: data.map((datum, index) => ({ ...datum, selected: index % 2 === 0 })),
  },
};

export const WithVerticalOrientation: Story = {
  args: {
    orientation: 'vertical',
  },
};

export const WithMasterCheckbox: Story = {
  args: {
    withMasterCheckbox: true,
  },
};

export const WithCustomMasterCheckboxLabel: Story = {
  args: {
    withMasterCheckbox: true,
    masterCheckboxLabel: 'Select all',
  },
};

export const WithReactiveForm: Story = {
  render: (args) => ({
    moduleMetadata: {
      imports: [ReactiveFormsModule, JsonPipe],
    },
    props: {
      ...args,
      selectedValues: new FormControl(data.filter((_datum, index) => index % 2 === 0).map(({ id }) => id)),
    },
    template: `
      <design-system-checkbox-group [formControl]="selectedValues" [data]="data" testId="checkbox-group" />

      <pre><code>Selected values: {{ selectedValues.value | json }}</code></pre>
    `,
  }),
};
