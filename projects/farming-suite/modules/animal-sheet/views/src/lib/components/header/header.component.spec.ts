import { ResourceRef, ResourceStatus, signal, WritableResource } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import {
  AnimalSheetHeader,
  GetHeaderDataUseCase,
  GetNotificationsCountUseCase,
  SelectedAnimalStore,
} from '@cooperl/farming-suite/animal-sheet/domain';
import { LanguageService } from '@cooperl/i18n';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { Sex } from '@cooperl/utils';
import { TranslocoLocaleService } from '@jsverse/transloco-locale';
import { fireEvent } from '@testing-library/angular';
import { AlertComponent } from '../alert/alert.component';
import { OpenLogbookButtonComponent } from '../logbook/open-logbook-button.component';
import { HeaderComponent } from './header.component';

const fakeSow: AnimalSheetHeader = {
  animal: {
    id: 1,
    sex: Sex.Female,

    parity: 5,
    batch: {
      id: 'b2.21',
      name: 'B2.21',
    },
    structure: {
      id: 1,
      name: 'Gestation n°1',
      case: {
        id: 3,
        name: 'Case 3',
      },
    },
    physiologicalState: {
      i18nKey: 'lactation',
      startDate: new Date('2023-11-21'),
    },
  },

  alerts: [
    { title: 'Aiguille cassée', updateDate: new Date('2024-12-12') },
    { title: "Délais d'attente : 5 jours", updateDate: new Date('2024-12-12') },
  ],
};

const fakeBoar: typeof fakeSow = {
  ...fakeSow,
  animal: {
    ...fakeSow.animal,
    parity: undefined,
    sex: Sex.Male,
  },
};

const renderComponent = <E>(params: GenerationParams<AnimalSheetHeader, E> = { value: fakeSow }) =>
  renderElement(HeaderComponent, {
    providers: [
      { provide: GetHeaderDataUseCase, useValue: generateFakeUseCase(params) },
      { provide: SelectedAnimalStore, useValue: { animalId: signal(1) } },
      {
        provide: GetNotificationsCountUseCase,
        useValue: {
          execute: () =>
            ({
              value: signal(1),
            }) as ResourceRef<number>,
          poll: jest.fn(),
          stopPolling: jest.fn(),
        } as GetNotificationsCountUseCase,
      },
    ],
  });

describe('[Farming Suite - Animal Sheet] HeaderComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderComponent();
    expect(fixture.componentInstance).toBeInstanceOf(HeaderComponent);
  });

  describe('Sticky Mode', () => {
    it("should compute it's height when view is init", async () => {
      const { fixture } = await renderComponent();
      const heightChangeSpy = jest.spyOn(fixture.componentInstance.heightChange, 'emit');

      // Bad Practice Acknowledged : Can't find a better way to perform this test as i can't check if spy has been called after the view init
      fixture.componentInstance.ngAfterViewInit();

      expect(heightChangeSpy).toHaveBeenCalledWith(expect.any(Number));
    });

    it("should compute it's height on scroll", async () => {
      const { fixture } = await renderComponent();
      const heightChangeSpy = jest.spyOn(fixture.componentInstance.heightChange, 'emit');

      fireEvent.scroll(window, { target: { scrollY: 200 } });

      expect(heightChangeSpy).toHaveBeenCalledWith(expect.any(Number));
    });

    it('should not be sticky by default', async () => {
      const { fixture } = await renderComponent();
      expect(fixture.componentInstance['stickyModeActive']).toBe(false);
    });

    it('should have a defined threshold', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance;
      const threshold = fixture.componentInstance['_scrollThreshold'];

      fireEvent.scroll(window, { target: { scrollY: threshold / 2 } });

      expect(component['stickyModeActive']).toBe(false);

      fireEvent.scroll(window, { target: { scrollY: threshold + 1 } });

      expect(component['stickyModeActive']).toBe(true);
    });

    it('should add the threshold height to the header height when sticky', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance;
      const threshold = fixture.componentInstance['_scrollThreshold'];
      const heightChangeSpy = jest.spyOn(component.heightChange, 'emit');

      // Scroll to the threshold
      fireEvent.scroll(window, { target: { scrollY: threshold } });

      // In a virtual dom, there is no height
      expect(heightChangeSpy).toHaveBeenCalledWith(0);

      // Scroll past the threshold
      fireEvent.scroll(window, { target: { scrollY: threshold + 1 } });

      expect(heightChangeSpy).toHaveBeenCalledWith(threshold);
    });
  });

  describe('Notifications Button', () => {
    it('should render the notifications button', async () => {
      const { fixture } = await renderComponent();
      expect(fixture.debugElement.query(By.directive(OpenLogbookButtonComponent)).nativeElement).toBeVisible();
    });
  });

  describe('Title', () => {
    testForAvailableLanguages(({ setLanguageToTestedLocale }) => {
      it('should render the title when animal is a sow', async () => {
        const { fixture, getByText } = await renderComponent();

        setLanguageToTestedLocale(fixture);

        const animalId = TestBed.inject(SelectedAnimalStore).animalId();
        const translatedTitle = TestBed.inject(LanguageService).translate('farming-suite.animal-sheet.components.header.title.sow', {
          animalId,
        });
        const title = getByText(translatedTitle);

        expect(title).toBeVisible();
      });

      it('should render the title when animal is a boar', async () => {
        const { fixture, getByText } = await renderComponent({ value: fakeBoar });

        setLanguageToTestedLocale(fixture);

        const animalId = TestBed.inject(SelectedAnimalStore).animalId();
        const translatedTitle = TestBed.inject(LanguageService).translate('farming-suite.animal-sheet.components.header.title.boar', {
          animalId,
        });
        const title = getByText(translatedTitle);

        expect(title).toBeVisible();
      });

      it('should render the title when animal resource is loading', async () => {
        const { fixture, getByText } = await renderComponent({ isLoading: true });

        setLanguageToTestedLocale(fixture);

        const animalId = TestBed.inject(SelectedAnimalStore).animalId();
        const translatedTitle = TestBed.inject(LanguageService).translate('farming-suite.animal-sheet.components.header.title.animal', {
          animalId,
        });
        const title = getByText(translatedTitle);

        expect(title).toBeVisible();
      });

      it('should render the title when animal resource has an error', async () => {
        const { fixture, getByText } = await renderComponent({ error: 'something went wrong' });

        setLanguageToTestedLocale(fixture);

        const animalId = TestBed.inject(SelectedAnimalStore).animalId();
        const translatedTitle = TestBed.inject(LanguageService).translate('farming-suite.animal-sheet.components.header.title.animal', {
          animalId,
        });
        const title = getByText(translatedTitle);

        expect(title).toBeVisible();
      });
    });
  });

  describe('Actions', () => {
    describe('Rename', () => {
      let button: HTMLElement;
      let fixture: ComponentFixture<HeaderComponent>;

      beforeEach(async () => {
        const renderedComponent = await renderComponent();

        button = renderedComponent.getByTestId('rename');
        fixture = renderedComponent.fixture;
      });

      it('should be visible', async () => {
        expect(button).toBeVisible();
      });

      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should contains a text', async () => {
          setLanguageToTestedLocale(fixture);

          const title = translations['farming-suite']['animal-sheet'].components.header.actions.rename;
          expect(button).toHaveTextContent(title);
        });
      });

      it('should contains an icon', async () => {
        expect(button).toHaveTextContent('edit');
      });

      it.todo('should do something on click');
    });

    describe('Print', () => {
      let button: HTMLElement;
      let fixture: ComponentFixture<HeaderComponent>;

      beforeEach(async () => {
        const renderedComponent = await renderComponent();

        button = renderedComponent.getByTestId('print');
        fixture = renderedComponent.fixture;
      });

      it('should be visible', async () => {
        expect(button).toBeVisible();
      });

      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should contains a text', async () => {
          setLanguageToTestedLocale(fixture);

          const title = translations['farming-suite']['animal-sheet'].components.header.actions.print;
          expect(button).toHaveTextContent(title);
        });
      });

      it('should contains an icon', async () => {
        expect(button).toHaveTextContent('print');
      });

      it.todo('should do something on click');
    });
  });

  describe('Status', () => {
    describe('Parity', () => {
      const testId = 'parity';

      it('should render if the animal is a sow', async () => {
        const { getByTestId } = await renderComponent();
        const element = getByTestId(testId);
        expect(element).toBeVisible();
      });

      it('should not render if the animal is a boar', async () => {
        const { queryByTestId } = await renderComponent({ value: fakeBoar });

        expect(queryByTestId('parity')).toBeNull();
      });

      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should display a specific title', async () => {
          const { fixture, getByTestId } = await renderComponent();
          const element = getByTestId(testId);

          setLanguageToTestedLocale(fixture);

          const expectedTitle = translations['farming-suite'].animals.sow.parity;
          expect(element).toHaveTextContent(expectedTitle);
        });

        it('should display a loading message', async () => {
          const { fixture, getByTestId } = await renderComponent({ isLoading: true });
          const element = getByTestId(testId);

          setLanguageToTestedLocale(fixture);

          const expectedContent = translations.common.loading;
          expect(element).toHaveTextContent(expectedContent);
        });

        it('should display an error message', async () => {
          const { fixture, getByTestId } = await renderComponent({ error: 'something went wrong' });
          const element = getByTestId(testId);

          setLanguageToTestedLocale(fixture);

          const expectedContent = translations.common.loading;
          expect(element).toHaveTextContent(expectedContent);
        });
      });

      it('should display the animal parity', async () => {
        const { getByTestId } = await renderComponent();
        const element = getByTestId(testId);

        const expectedParity = fakeSow.animal.parity;
        expect(element).toHaveTextContent(expectedParity?.toString() ?? 'ERROR_IN_THIS_TEST');
      });
    });

    describe('Batch', () => {
      const testId = 'batch';

      it('should render', async () => {
        const { getByTestId } = await renderComponent();
        const element = getByTestId(testId);
        expect(element).toBeVisible();
      });

      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should display a specific title', async () => {
          const { fixture, getByTestId } = await renderComponent();
          const element = getByTestId(testId);

          setLanguageToTestedLocale(fixture);

          const expectedTitle = translations['farming-suite'].animals.sow.batch;
          expect(element).toHaveTextContent(expectedTitle);
        });

        it('should display a loading message', async () => {
          const { fixture, getByTestId } = await renderComponent({ isLoading: true });
          const element = getByTestId(testId);

          setLanguageToTestedLocale(fixture);

          const expectedContent = translations.common.loading;
          expect(element).toHaveTextContent(expectedContent);
        });

        it('should display an error message', async () => {
          const { fixture, getByTestId } = await renderComponent({ error: 'something went wrong' });
          const element = getByTestId(testId);

          setLanguageToTestedLocale(fixture);

          const expectedContent = translations.common.loading;
          expect(element).toHaveTextContent(expectedContent);
        });
      });

      it('should display the animal batch name', async () => {
        const { getByTestId } = await renderComponent();
        const element = getByTestId(testId);

        const expectedBatch = fakeSow.animal.batch.name;
        expect(element).toHaveTextContent(expectedBatch);
      });

      it('should be bound to a route', async () => {
        const { getByTestId } = await renderComponent();
        const element = getByTestId(testId);

        const expectedBatchId = fakeSow.animal.batch.id;
        expect(element).toHaveAttribute('ng-reflect-router-link', `batch,${expectedBatchId}`);
      });
    });

    describe('Structure', () => {
      const testId = 'structure';

      it('should render', async () => {
        const { getByTestId } = await renderComponent();
        const element = getByTestId(testId);
        expect(element).toBeVisible();
      });

      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should display a specific title', async () => {
          const { fixture, getByTestId } = await renderComponent();
          const element = getByTestId(testId);

          setLanguageToTestedLocale(fixture);

          const expectedTitle = translations['farming-suite'].animals.sow.structure;
          expect(element).toHaveTextContent(expectedTitle);
        });

        it('should display a loading message', async () => {
          const { fixture, getByTestId } = await renderComponent({ isLoading: true });
          const element = getByTestId(testId);

          setLanguageToTestedLocale(fixture);

          const expectedContent = translations.common.loading;
          expect(element).toHaveTextContent(expectedContent);
        });

        it('should display an error message', async () => {
          const { fixture, getByTestId } = await renderComponent({ error: 'something went wrong' });
          const element = getByTestId(testId);

          setLanguageToTestedLocale(fixture);

          const expectedContent = translations.common.loading;
          expect(element).toHaveTextContent(expectedContent);
        });
      });

      it('should display the animal structure and case names', async () => {
        const { getByTestId } = await renderComponent();
        const element = getByTestId(testId);

        const expectedStructure = fakeSow.animal.structure.name;
        const expectedCase = fakeSow.animal.structure.case.name;
        expect(element).toHaveTextContent(`${expectedStructure}, ${expectedCase}`);
      });

      it('should be bound to a route', async () => {
        const { getByTestId } = await renderComponent();
        const element = getByTestId(testId);

        const expectedStructureId = fakeSow.animal.structure.id;
        expect(element).toHaveAttribute('ng-reflect-router-link', `structure,${expectedStructureId}`);
      });
    });

    describe('Physiological State', () => {
      const testId = 'physiological-state';

      it('should render', async () => {
        const { getByTestId } = await renderComponent();
        const element = getByTestId(testId);
        expect(element).toBeVisible();
      });

      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should display a specific title', async () => {
          const { fixture, getByTestId } = await renderComponent();
          const element = getByTestId(testId);

          setLanguageToTestedLocale(fixture);

          const expectedTitle = translations['farming-suite'].animals.sow['physiological-state'].title;
          expect(element).toHaveTextContent(expectedTitle);
        });

        it('should display the animal physiological state', async () => {
          const { fixture, getByTestId } = await renderComponent();
          const element = getByTestId(testId);

          setLanguageToTestedLocale(fixture);

          const expectedPhysiologicalState = translations['farming-suite'].animals.sow['physiological-state'].lactation;
          expect(element).toHaveTextContent(expectedPhysiologicalState);
        });

        it('should display the animal physiological state update date', async () => {
          const { fixture, getByTestId } = await renderComponent();
          const element = getByTestId(testId);

          setLanguageToTestedLocale(fixture);

          const expectedDate = TestBed.inject(TranslocoLocaleService).localizeDate(fakeSow.animal.physiologicalState.startDate);
          expect(element).toHaveTextContent(expectedDate);
        });

        it('should display a loading message', async () => {
          const { fixture, getByTestId } = await renderComponent({ isLoading: true });
          const element = getByTestId(testId);

          setLanguageToTestedLocale(fixture);

          const expectedContent = translations.common.loading;
          expect(element).toHaveTextContent(expectedContent);
        });

        it('should display an error message', async () => {
          const { fixture, getByTestId } = await renderComponent({ error: 'something went wrong' });
          const element = getByTestId(testId);

          setLanguageToTestedLocale(fixture);

          const expectedContent = translations['farming-suite'].animals.sow['physiological-state'].unknown;
          expect(element).toHaveTextContent(expectedContent);
        });
      });
    });
  });

  describe('Alerts', () => {
    it('should render alerts if there are any', async () => {
      const { getAllByTestId } = await renderComponent();

      const alerts = getAllByTestId('alert');
      expect(alerts.length).toBe(fakeSow.alerts.length);
    });

    it('should pass the correct data to the alert components', async () => {
      const { fixture } = await renderComponent();

      const alertElements: AlertComponent[] = fixture.debugElement.queryAll(By.css('[data-testid="alert"]')).map((el) => el.componentInstance);

      fakeSow.alerts.forEach((alert, index) => {
        const alertElement = alertElements[index];
        expect(alertElement.title()).toBe(alert.title);
        expect(alertElement.updateDate()).toBe(alert.updateDate);
      });
    });

    it('should not render alerts if there are none', async () => {
      const { queryAllByTestId } = await renderComponent({ value: { ...fakeSow, alerts: [] } });

      const alerts = queryAllByTestId('alert');
      expect(alerts.length).toBe(0);
    });
  });

  describe('Navigation', () => {
    it('should render the navigation', async () => {
      const { getByTestId } = await renderComponent();

      expect(getByTestId('navigation')).toBeVisible();
    });
  });
});

interface GenerationParams<T, E> {
  value?: T;
  isLoading?: boolean;
  error?: E;
}

function generateFakeResourceRef<T, E>({ value, isLoading, error }: GenerationParams<T, E>): ResourceRef<T> {
  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- don't care here
    value: signal(value!),
    isLoading: signal(isLoading ?? false),
    error: signal(error),
    destroy: jest.fn(),
    asReadonly: jest.fn(),
    reload: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
    status: signal(ResourceStatus.Resolved),
    hasValue: jest.fn() as unknown as WritableResource<T>['hasValue'],
  };
}

function generateFakeUseCase<E>({ value, error, isLoading }: GenerationParams<AnimalSheetHeader, E>): GetHeaderDataUseCase {
  return {
    execute: () => generateFakeResourceRef({ value, error, isLoading }),
  };
}
