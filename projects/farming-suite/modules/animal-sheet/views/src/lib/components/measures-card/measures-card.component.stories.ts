import { MeasuresTag } from '@cooperl/farming-suite/animal-sheet/domain';
import type { Meta, StoryObj } from '@storybook/angular';
import { MeasuresCardComponent } from './measures-card.component';

const meta: Meta<MeasuresCardComponent> = {
  component: MeasuresCardComponent,
  title: 'Measures',
  argTypes: {
    measuresTag: {
      options: Object.keys(MeasuresTag)
        .filter((x) => !isNaN(Number(x)))
        .map(Number),
      control: {
        type: 'select',
        labels: Object.values(MeasuresTag).filter(String),
      },
    },
  },
};
export default meta;
type Story = StoryObj<MeasuresCardComponent>;

export const Weight: Story = {
  args: {
    measuresTag: MeasuresTag.Pregnant,
    date: new Date(),
    measures: 184,
    parity: 2,
    isWeight: true,
  },
};

export const Thickness: Story = {
  args: {
    measuresTag: MeasuresTag.Pregnant,
    date: new Date(),
    measures: 15,
    parity: 2,
    isWeight: false,
  },
};
