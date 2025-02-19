import { CdkPortalOutlet } from '@angular/cdk/portal';
import { Component, effect, inject, viewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SidePanelService } from '@cooperl/design-system';
import { SideMenuComponent } from './side-menu/side-menu.component';

@Component({
  imports: [
    // Angular
    RouterModule,
    // External
    MatSidenavModule,
    CdkPortalOutlet,
    // Internal
    SideMenuComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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
