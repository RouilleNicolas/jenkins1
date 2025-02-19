import { Backgrounds } from '@cooperl/design-system/testing';
import type { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert.component';

const meta: Meta<AlertComponent> = {
  component: AlertComponent,
  title: 'Header/AlertComponent',
  parameters: {
    backgrounds: {
      default: Backgrounds.Header,
    },
  },
};
export default meta;
type Story = StoryObj<AlertComponent>;

export const Primary: Story = {
  args: {
    title: "Titre de l'alerte",
    updateDate: new Date(),
  },
};
