import { Provider, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ViewportService } from '@cooperl/design-system';
import { renderElement } from '@cooperl/design-system/testing';
import { LanguageService } from '@cooperl/i18n';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { ComponentInput } from '@testing-library/angular';
import { CareerRoute } from '../../pages/career';
import { CommentsRoute } from '../../pages/comments';
import { GeneralRoute } from '../../pages/general';
import { InternalMovementRoute } from '../../pages/internal-movement';
import { MeasuresRoute } from '../../pages/measures';
import { TreatmentsRoute } from '../../pages/treatments';
import { HeaderNavComponent } from './header-nav.component';

const defaultInputs: ComponentInput<HeaderNavComponent> = {};

const renderComponent = (inputs = defaultInputs, providers: Provider[] = []) => renderElement(HeaderNavComponent, { inputs, providers });

describe('[Farming Suite - Animal Sheet] HeaderNavComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderComponent();

    expect(fixture.componentInstance).toBeInstanceOf(HeaderNavComponent);
  });

  describe('Handset css class', () => {
    it('should not have handset css class when viewport is not handset', async () => {
      const { fixture } = await renderComponent(defaultInputs, [
        {
          provide: ViewportService,
          useValue: {
            isHandsetViewport: signal(false),
          },
        },
      ]);

      expect(fixture.nativeElement).not.toHaveClass('handset');
    });

    it('should have handset css class when viewport is handset', async () => {
      const { fixture } = await renderComponent(defaultInputs, [
        {
          provide: ViewportService,
          useValue: {
            isHandsetViewport: signal(true),
          },
        },
      ]);

      expect(fixture.nativeElement).toHaveClass('handset');
    });
  });

  describe('Nav tabs', () => {
    testForAvailableLanguages(({ setLanguageToTestedLocale }) => {
      it('should render all nav tabs', async () => {
        const routes = [GeneralRoute, CareerRoute, MeasuresRoute, InternalMovementRoute, CommentsRoute, TreatmentsRoute];
        const { getByText, fixture } = await renderComponent();

        setLanguageToTestedLocale(fixture);

        const languageService = TestBed.inject(LanguageService);

        for (const route of routes) {
          expect(getByText(languageService.translate(route.title))).toBeVisible();
        }
      });
    });
  });
});
