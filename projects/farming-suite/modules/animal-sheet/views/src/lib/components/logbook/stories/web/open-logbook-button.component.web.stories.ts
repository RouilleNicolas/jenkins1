import { CdkPortalOutlet } from '@angular/cdk/portal';
import { Component, effect, inject, viewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { SidePanelService } from '@cooperl/design-system';
import { Backgrounds } from '@cooperl/design-system/testing';
import { GetNotificationsCountUseCase, GetNotificationsDataUseCase } from '@cooperl/farming-suite/animal-sheet/domain';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { OpenLogbookButtonComponent } from '../../open-logbook-button.component';
import {
  FakeGetNotificationsCountUseCaseWithNoNotifications,
  FakeGetNotificationsCountUseCaseWithNotifications,
  FakeGetNotificationsDataUseCase,
} from '../fakes';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- We don't need to use the component in the app
  selector: 'storybook-open-logbook-button-web-wrapper',
  imports: [
    // Angular
    // External
    MatSidenavModule,
    CdkPortalOutlet,
    // Internal
    OpenLogbookButtonComponent,
  ],
  template: `
    <mat-drawer-container hasBackdrop>
      <mat-drawer mode="over" position="end">
        <ng-template [cdkPortalOutlet]="sidePanelService['_content']" />
      </mat-drawer>

      <mat-drawer-content>
        <farming-suite-animal-sheet-open-logbook-button testId="open-notifications-btn" />
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
        .mat-drawer-container {
          color: white;
          background-color: transparent;
          height: 100%;
        }
      }
    `,
  ],
})
class WrapperComponent {
  protected readonly sidePanelService = inject(SidePanelService);

  private drawerSet = false;
  private readonly _sidePanelDrawer = viewChild(MatDrawer);

  constructor() {
    effect(() => {
      const sidePanelDrawer = this._sidePanelDrawer();
      if (sidePanelDrawer && !this.drawerSet) {
        this.sidePanelService.setDrawer(sidePanelDrawer);
        this.drawerSet = true;
      }
    });
  }
}

const meta: Meta<WrapperComponent> = {
  component: WrapperComponent,
  title: 'Logbook/Button/Web',
  parameters: {
    backgrounds: {
      default: Backgrounds.Header,
    },
  },
};
export default meta;
type Story = StoryObj<WrapperComponent>;

export const WithNotifications: Story = {
  decorators: [
    applicationConfig({
      providers: [
        { provide: GetNotificationsCountUseCase, useValue: FakeGetNotificationsCountUseCaseWithNotifications },
        { provide: GetNotificationsDataUseCase, useValue: FakeGetNotificationsDataUseCase },
      ],
    }),
  ],
};

export const WithNoNotifications: Story = {
  decorators: [
    applicationConfig({
      providers: [{ provide: GetNotificationsCountUseCase, useValue: FakeGetNotificationsCountUseCaseWithNoNotifications }],
    }),
  ],
};
