import { ComponentPortal, DomPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, inject, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDrawer } from '@angular/material/sidenav';
import { Logger } from '@cooperl/logger';
import { SidePanelService } from './side-panel.service';

jest.mock('@cooperl/logger');

@Component({
  template: `<ng-template #tpl>Something here</ng-template>`,
})
class WrapperComponent {
  public readonly tpl = viewChild.required('tpl', { read: TemplateRef });
  public readonly viewContainerRef = inject(ViewContainerRef);
}

describe('SidePanelService', () => {
  let fixture: ComponentFixture<WrapperComponent>;

  it('should set the drawer if not already set', () => {
    const drawer = { open: jest.fn(), close: jest.fn() } as unknown as MatDrawer;
    const service = TestBed.inject(SidePanelService);
    service.setDrawer(drawer);

    expect(service['drawer']).toBe(drawer);
  });

  it('should not set the drawer if already set', () => {
    const drawer1 = { open: jest.fn(), close: jest.fn() } as unknown as MatDrawer;
    const drawer2 = { open: jest.fn(), close: jest.fn() } as unknown as MatDrawer;
    const loggerWarnSpy = jest.spyOn(Logger.prototype, 'warn');
    const service = TestBed.inject(SidePanelService);
    service.setDrawer(drawer1);
    service.setDrawer(drawer2);

    expect(service['drawer']).toBe(drawer1);
    expect(loggerWarnSpy).toHaveBeenCalledWith('Drawer already set');
  });

  it('should open the drawer with TemplateRef content', () => {
    fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    const { tpl, viewContainerRef } = fixture.debugElement.componentInstance as WrapperComponent;
    const drawer = { open: jest.fn(), close: jest.fn() } as unknown as MatDrawer;
    const service = TestBed.inject(SidePanelService);
    service.setDrawer(drawer);

    service.open(tpl(), viewContainerRef);

    expect(service['_content']).toBeInstanceOf(TemplatePortal);
    expect(drawer.open).toHaveBeenCalled();
  });

  it('should throw an error if viewContainerRef is not provided for TemplateRef content', () => {
    fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    const { tpl } = fixture.debugElement.componentInstance as WrapperComponent;
    const drawer = { open: jest.fn(), close: jest.fn() } as unknown as MatDrawer;
    const service = TestBed.inject(SidePanelService);
    service.setDrawer(drawer);

    // Break the type system to test the error
    expect(() => service.open(tpl(), undefined as unknown as ViewContainerRef)).toThrow('View container ref is required');
  });

  it('should open the drawer with HTMLElement content', () => {
    const element = document.createElement('div');
    const drawer = { open: jest.fn(), close: jest.fn() } as unknown as MatDrawer;
    const service = TestBed.inject(SidePanelService);
    service.setDrawer(drawer);

    service.open(element);

    expect(service['_content']).toBeInstanceOf(DomPortal);
    expect(drawer.open).toHaveBeenCalled();
  });

  it('should open the drawer with component content', () => {
    class TestComponent {}
    const drawer = { open: jest.fn(), close: jest.fn() } as unknown as MatDrawer;
    const service = TestBed.inject(SidePanelService);
    service.setDrawer(drawer);

    service.open(TestComponent);

    expect(service['_content']).toBeInstanceOf(ComponentPortal);
    expect(drawer.open).toHaveBeenCalled();
  });

  it('should throw an error for invalid content type', () => {
    const invalidContent = 123;
    const drawer = { open: jest.fn(), close: jest.fn() } as unknown as MatDrawer;
    const service = TestBed.inject(SidePanelService);
    service.setDrawer(drawer);

    expect(() => service.open(invalidContent as any)).toThrow('Invalid content type');
  });
});
