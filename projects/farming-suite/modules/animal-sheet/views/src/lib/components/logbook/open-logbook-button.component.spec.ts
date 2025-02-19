import { Provider, signal, ValueProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { SidePanelService, ViewportService } from '@cooperl/design-system';
import { renderElement } from '@cooperl/design-system/testing';
import { AnimalNotification, GetNotificationsCountUseCase, GetNotificationsDataUseCase } from '@cooperl/farming-suite/animal-sheet/domain';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { aliasedInput, ComponentInput, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { NotificationsSideContentComponent } from './notification-side-content/notifications-side-content.component';
import { NotificationsCountComponent } from './notifications-count/notifications-count.component';
import { OpenLogbookButtonComponent } from './open-logbook-button.component';

const defaultInputs: ComponentInput<OpenLogbookButtonComponent> = {
  ...aliasedInput('testId', 'testAnchor'),
};

const renderComponent = (inputs = defaultInputs, providers: Provider[] = [], nbOfNotifications = 0) =>
  renderElement(OpenLogbookButtonComponent, {
    inputs,
    providers: [
      {
        provide: GetNotificationsCountUseCase,
        useValue: <Partial<GetNotificationsCountUseCase>>{
          execute: () => ({ value: signal(nbOfNotifications) }) as ReturnType<GetNotificationsCountUseCase['execute']>,
          poll: jest.fn(),
          stopPolling: jest.fn(),
        },
      },
      {
        provide: GetNotificationsDataUseCase,
        useValue: <Partial<GetNotificationsDataUseCase>>{
          execute: () => ({ value: signal<AnimalNotification[]>([]) }) as ReturnType<GetNotificationsDataUseCase['execute']>,
        },
      },
      ...providers,
    ],
  });

describe('[Farming Suite - Animal Sheet] OpenLogbookButtonComponent', () => {
  it('should create', async () => {
    const { fixture } = await renderComponent();

    expect(fixture.componentInstance).toBeInstanceOf(OpenLogbookButtonComponent);
  });

  it('should poll the notifications count', async () => {
    await renderComponent();
    const getNotificationsCountUseCasePollSpy = jest.spyOn(TestBed.inject(GetNotificationsCountUseCase), 'poll');

    expect(getNotificationsCountUseCasePollSpy).toHaveBeenCalledTimes(1);
  });

  it('should stop polling the notifications count when destroyed', async () => {
    const { fixture } = await renderComponent();
    const getNotificationsCountUseCaseStopPollingSpy = jest.spyOn(TestBed.inject(GetNotificationsCountUseCase), 'stopPolling');

    fixture.destroy();

    expect(getNotificationsCountUseCaseStopPollingSpy).toHaveBeenCalledTimes(1);
  });

  describe('Automated test anchor', () => {
    it('should throw an error if the test anchor is not provided', async () => {
      await expect(renderComponent({})).rejects.toThrow('NG0950');
    });
  });

  describe('Handset viewport', () => {
    const fakeViewportService: ViewportService = { isHandsetViewport: signal(true) };
    const viewportServiceProvider: ValueProvider = { provide: ViewportService, useValue: fakeViewportService };
    const renderComponentInFakeHandsetViewport = (nbOfNotifications = 0) =>
      renderComponent(defaultInputs, [viewportServiceProvider], nbOfNotifications);

    it('should have the handset css class', async () => {
      const { fixture } = await renderComponentInFakeHandsetViewport();

      expect(fixture.nativeElement).toHaveClass('handset');
    });

    describe('Bottom Sheet', () => {
      it('should open a bottom sheet when clicked', async () => {
        const user = userEvent.setup();
        const { fixture } = await renderComponentInFakeHandsetViewport();

        expect(screen.queryByRole('dialog')).toBeNull();

        await user.click(fixture.nativeElement);

        expect(screen.getByRole('dialog')).toBeVisible();
      });

      it('should contains the notifications side content', async () => {
        const user = userEvent.setup();
        const { fixture } = await renderComponentInFakeHandsetViewport();

        expect(document.querySelector('farming-suite-animal-sheet-notifications-side-content')).toBeNull();

        await user.click(fixture.nativeElement);

        expect(document.querySelector('farming-suite-animal-sheet-notifications-side-content')).toBeTruthy();
      });
    });

    describe('Icon', () => {
      it('should contains an icon', async () => {
        const { fixture } = await renderComponent();

        expect(fixture.debugElement.query(By.directive(MatIcon)).nativeElement).toBeVisible();
      });
    });
  });

  describe('Desktop viewport', () => {
    describe('Side Panel', () => {
      // We can't really test that the side panel is visible
      // So we will check that the side panel service is called instead
      it('should open a side panel when clicked', async () => {
        const user = userEvent.setup();
        const { fixture } = await renderComponent();
        const sidePanelServiceOpenSpy = jest.spyOn(TestBed.inject(SidePanelService), 'open');

        expect(sidePanelServiceOpenSpy).not.toHaveBeenCalled();

        await user.click(fixture.nativeElement);

        expect(sidePanelServiceOpenSpy).toHaveBeenCalled();
      });

      it('should contains the notifications side content', async () => {
        const user = userEvent.setup();
        const { fixture } = await renderComponent();
        const sidePanelServiceOpenSpy = jest.spyOn(TestBed.inject(SidePanelService), 'open');

        expect(sidePanelServiceOpenSpy).not.toHaveBeenCalled();

        await user.click(fixture.nativeElement);

        expect(sidePanelServiceOpenSpy).toHaveBeenCalledWith(NotificationsSideContentComponent);
      });
    });

    describe('Button', () => {
      it('should display a button', async () => {
        const { getByRole } = await renderComponent();

        expect(getByRole('button')).toBeVisible();
      });

      it('should contains an icon', async () => {
        const { fixture } = await renderComponent();

        expect(fixture.debugElement.query(By.directive(MatIcon)).nativeElement).toBeVisible();
      });

      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should contains a specific text', async () => {
          const { fixture, getByRole } = await renderComponent();

          setLanguageToTestedLocale(fixture);

          const expectedText = translations['farming-suite']['animal-sheet'].components.logbook.button.label;
          expect(getByRole('button')).toHaveTextContent(expectedText);
        });

        it('should contains an aria label', async () => {
          const { fixture, getByRole } = await renderComponent();

          setLanguageToTestedLocale(fixture);

          const expectedText = translations['farming-suite']['animal-sheet'].components.logbook.button['aria-label'];
          expect(getByRole('button')).toHaveAttribute('aria-label', expectedText);
        });
      });

      describe('Badge', () => {
        it('should not display the badge when there is no notification', async () => {
          const { fixture } = await renderComponent(defaultInputs, [], 0);

          const notifCountDebugElement = fixture.debugElement.query(By.css('button')).query(By.directive(NotificationsCountComponent));
          expect(notifCountDebugElement).toBeNull();
        });

        it('should display the number of notifications when there is at least one notification', async () => {
          const { fixture } = await renderComponent(defaultInputs, [], 2);

          const notifCountElement = fixture.debugElement.query(By.css('button')).query(By.directive(NotificationsCountComponent)).nativeElement;
          expect(notifCountElement).toBeVisible();
          expect(notifCountElement).toHaveTextContent('2');
        });
      });
    });
  });
});
