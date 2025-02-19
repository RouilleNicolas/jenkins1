import { type Meta, type StoryObj } from '@storybook/angular';
import { DynamicFormElementGenerators } from '../../stories/dynamic-form-element-generator';
import { DynamicFormLabelComponent } from './dynamic-form-label.component';

const defaultElement = DynamicFormElementGenerators.label({
  type: 'label',
  position: { x: 0, y: 0 },
  content: 'Label',
});

const meta: Meta<DynamicFormLabelComponent> = {
  component: DynamicFormLabelComponent,
  title: 'Components/Dynamic Form/Label',
};
export default meta;
type Story = StoryObj<DynamicFormLabelComponent>;

export const Default: Story = {
  args: {
    element: defaultElement
  },
};
