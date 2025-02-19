import { Backgrounds } from '@cooperl/design-system/testing';
import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { HeaderNavItemComponent } from '../header-nav-item.component';

const meta: Meta<HeaderNavItemComponent> = {
  component: HeaderNavItemComponent,
  title: 'Header/Navigation/Item/Mobile',
  parameters: {
    docs: undefined,
    backgrounds: {
      default: Backgrounds.Header,
    },
    viewport: {
      defaultViewport: 'iphone14promax',
    },
  },
  render: (args) => ({
    props: args,
    template: `<farming-suite-animal-sheet-header-nav-item ${argsToTemplate(args)}>Général</farming-suite-animal-sheet-header-nav-item>`,
  }),
};
export default meta;
type Story = StoryObj<HeaderNavItemComponent>;

export const Active: Story = {
  args: {
    active: true,
  },
};

export const Inactive: Story = {
  args: {
    active: false,
  },
};
