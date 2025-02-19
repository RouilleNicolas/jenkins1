import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestIdDirective } from './test-id.directive';

describe('TestIdDirective', () => {
  @Component({
    template: `<div designSystemTestId="my-anchor"></div>`,
    imports: [TestIdDirective],
    standalone: true,
  })
  class FixtureComponent {}

  let component: FixtureComponent;
  let fixture: ComponentFixture<FixtureComponent>;
  let divElement: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixtureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FixtureComponent);
    fixture.detectChanges();

    component = fixture.componentInstance;
    fixture.detectChanges();

    divElement = fixture.nativeElement.querySelector('div');
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should set the attr.data-cy host attribute', () => {
    expect(divElement.getAttribute('data-cy')).toBe('my-anchor');
  });

  it('should set the attr.robot-anchor host attribute', () => {
    expect(divElement.getAttribute('robot-anchor')).toBe('my-anchor');
  });

  it('should set the attr.data-testid host attribute', () => {
    expect(divElement.getAttribute('data-testid')).toBe('my-anchor');
  });
});
