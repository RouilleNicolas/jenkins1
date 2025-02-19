import { provideRouter } from '@angular/router';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { PorkInfoComponent } from './pork-info.component';

const meta: Meta<PorkInfoComponent> = {
  component: PorkInfoComponent,
  title: 'Header/Pork Info',
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
  parameters: {
    backgrounds: {
      default: 'Header',
    },
  },
};
export default meta;
type Story = StoryObj<PorkInfoComponent>;

export const Basic: Story = {
  args: {
    title: 'Title',
    content: 'Content',
  },
};

export const WithRoute: Story = {
  args: {
    title: 'Title',
    content: 'Content',
    route: '/route',
  },
};

export const WithDate: Story = {
  args: {
    title: 'Title',
    content: 'Content',
    date: new Date(),
  },
};
