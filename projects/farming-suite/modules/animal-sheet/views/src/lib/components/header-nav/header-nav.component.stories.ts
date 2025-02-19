import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { Backgrounds } from '@cooperl/design-system/testing';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { CareerRoute } from '../../pages/career';
import { CommentsRoute } from '../../pages/comments';
import { GeneralRoute } from '../../pages/general';
import { InternalMovementRoute } from '../../pages/internal-movement';
import { MeasuresRoute } from '../../pages/measures';
import { TreatmentsRoute } from '../../pages/treatments';
import { HeaderNavComponent } from './header-nav.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'storybook-wrapper-header-nav',
  imports: [
    // Angular
    RouterOutlet,
    // External
    // Internal
    HeaderNavComponent,
  ],
  template: `
    <farming-suite-animal-sheet-header-nav />

    <div>
      <router-outlet />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class WrapperComponent {}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'storybook-wrapper-header-nav-route-content',
  template: `
    <h1>Route : {{ routeName }}</h1>
    <p>You can simulate an horizontal scroll event with MAJ+Scroll with your cursor in the nav menu</p>
  `,
  styles: [
    `
      :host {
        color: white;
      }
    `,
  ],
})
class ContentWrapperComponent {
  protected readonly routeName = inject(Router).url.split('/')[1];
}

const meta: Meta<WrapperComponent> = {
  component: WrapperComponent,
  title: 'Header/Navigation/Main Component',
  parameters: {
    backgrounds: {
      default: Backgrounds.Header,
    },
  },
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([
          { path: '', redirectTo: GeneralRoute.link, pathMatch: 'full' },
          {
            path: GeneralRoute.link,
            component: ContentWrapperComponent,
          },
          {
            path: CareerRoute.link,
            component: ContentWrapperComponent,
          },
          {
            path: MeasuresRoute.link,
            component: ContentWrapperComponent,
          },
          {
            path: InternalMovementRoute.link,
            component: ContentWrapperComponent,
          },
          {
            path: CommentsRoute.link,
            component: ContentWrapperComponent,
          },
          {
            path: TreatmentsRoute.link,
            component: ContentWrapperComponent,
          },
        ]),
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<WrapperComponent>;

export const Web: Story = {
  args: {},
};

export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: { defaultViewport: 'iphone14promax' },
  },
};
