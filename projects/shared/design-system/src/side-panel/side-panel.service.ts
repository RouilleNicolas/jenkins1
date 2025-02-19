import { ComponentPortal, DomPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Logger } from '@cooperl/logger';

@Injectable({ providedIn: 'root' })
export class SidePanelService {
  protected _content: Portal<unknown> | null = null;

  private drawer: MatDrawer | null = null;
  private readonly _logger = new Logger('SidePanelService');

  /**
   * Sets the drawer instance for the side panel.
   * If a drawer is already set, a warning will be logged and the method will return without setting a new drawer.
   *
   * @param drawer - The MatDrawer instance to be set.
   */
  public setDrawer(drawer: MatDrawer): void {
    if (this.drawer) {
      this._logger.warn('Drawer already set');
      return;
    }

    this.drawer = drawer;
  }

  /**
   * Open the side panel with the given template reference in content.
   */
  public open(content: TemplateRef<unknown>, viewContainerRef: ViewContainerRef): void;
  /**
   * Open the side panel with the given HTML element in content.
   */
  public open(content: HTMLElement): void;
  /**
   * Open the side panel with the given component in content.
   */
  public open(content: Type<unknown>): void;
  public open(content: TemplateRef<unknown> | HTMLElement | Type<unknown>, viewContainerRef?: ViewContainerRef): void {
    if (content instanceof TemplateRef) {
      if (!viewContainerRef) {
        throw new Error('View container ref is required');
      }
      this._content = new TemplatePortal(content, viewContainerRef);
    } else if (content instanceof HTMLElement) {
      this._content = new DomPortal(content);
    } else if (content instanceof Type) {
      this._content = new ComponentPortal(content);
    } else {
      throw new Error('Invalid content type');
    }

    this.drawer?.open();
  }
}
