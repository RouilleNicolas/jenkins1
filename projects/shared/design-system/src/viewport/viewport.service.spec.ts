import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ViewportService } from './viewport.service';

describe('ViewportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: BreakpointObserver, useClass: FakeBreakpointObserver }],
    });
  });

  it('should instantiate', () => {
    const service = TestBed.inject(ViewportService);
    expect(service).toBeTruthy();
  });

  describe('isMobileViewport', () => {
    it('should return true when the BreakpointObserver match the Handset breakpoint query', () => {
      const breakpointObserver = TestBed.inject(BreakpointObserver);
      (breakpointObserver as FakeBreakpointObserver).fakeMatches = true;
      const service = TestBed.inject(ViewportService);

      const isMobileViewport = service.isHandsetViewport();
      expect(isMobileViewport).toBe(true);
    });

    it('should return false when the BreakpointObserver does not match the Handset breakpoint query', () => {
      const breakpointObserver = TestBed.inject(BreakpointObserver);
      (breakpointObserver as FakeBreakpointObserver).fakeMatches = false;
      const service = TestBed.inject(ViewportService);

      const isMobileViewport = service.isHandsetViewport();
      expect(isMobileViewport).toBe(false);
    });
  });
});

@Injectable()
class FakeBreakpointObserver extends BreakpointObserver {
  fakeMatches = false;

  override observe(_value: string | readonly string[]): Observable<BreakpointState> {
    return of({ matches: this.fakeMatches, breakpoints: {} });
  }
}
