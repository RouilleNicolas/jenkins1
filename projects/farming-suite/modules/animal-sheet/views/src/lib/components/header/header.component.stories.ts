import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, effect, inject, ResourceRef, signal, viewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { provideRouter, RouterOutlet } from '@angular/router';
import { SidePanelService } from '@cooperl/design-system';
import {
  Alert,
  AnimalEventEnum,
  AnimalNotification,
  AnimalSheetHeader,
  GetHeaderDataUseCase,
  GetNotificationsCountUseCase,
  GetNotificationsDataUseCase,
  SelectedAnimalStore,
} from '@cooperl/farming-suite/animal-sheet/domain';
import { Sex } from '@cooperl/utils';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { noop } from 'rxjs';
import { CareerRoute } from '../../pages/career';
import { CommentsRoute } from '../../pages/comments';
import { GeneralRoute } from '../../pages/general';
import { InternalMovementRoute } from '../../pages/internal-movement';
import { MeasuresRoute } from '../../pages/measures';
import { TreatmentsRoute } from '../../pages/treatments';
import { HeaderComponent } from './header.component';

const FakeSelectedAnimalStore: SelectedAnimalStore = {
  animalId: signal(0),
};

@Component({
  selector: 'farming-suite-animal-sheet-wrapper',
  imports: [
    // Angular
    RouterOutlet,
    // External
    MatSidenavModule,
    CdkPortalOutlet,
    // Internal
    HeaderComponent,
  ],
  template: `
    <mat-drawer-container hasBackdrop>
      <mat-drawer mode="over" position="end">
        <ng-template [cdkPortalOutlet]="sidePanelService['_content']" />
      </mat-drawer>

      <mat-drawer-content>
        <div>
          <farming-suite-animal-sheet-header (heightChange)="headerHeight = $event" />

          <div>
            <router-outlet />
          </div>
        </div>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [
    `
      :host {
        display: block;

        .mat-drawer-container {
          height: 100%;

          padding-top: var(--header-height, initial);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--header-height]': 'headerHeight + "px"',
  },
})
class WrapperComponent {
  protected headerHeight = 0;

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

@Component({
  selector: 'farming-suite-animal-sheet-content-wrapper',
  template: `
    @for (i of lines; track $index) {
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel odio</p>
    }
  `,
})
class ContentWrapperComponent {
  protected readonly lines = Array.from({ length: 1000 }, (_, i) => i);
}

const meta: Meta<WrapperComponent> = {
  component: WrapperComponent,
  title: 'Header/Main Component',
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([
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
        { provide: SelectedAnimalStore, useValue: FakeSelectedAnimalStore },
        {
          provide: GetNotificationsCountUseCase,
          useValue: {
            execute: () => ({ value: signal(0) }),
            poll: noop,
            stopPolling: noop,
          } as GetNotificationsCountUseCase,
        },
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<WrapperComponent>;

const FakeGetHeaderDataUseCaseWithSow: Partial<GetHeaderDataUseCase> = {
  execute: () =>
    ({
      value: signal<AnimalSheetHeader>({
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
              name: 'case 3',
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
      }),
      isLoading: signal(false),
      error: signal(null),
    }) as unknown as ReturnType<GetHeaderDataUseCase['execute']>,
};
export const Sow: Story = {
  decorators: [
    applicationConfig({
      providers: [{ provide: GetHeaderDataUseCase, useValue: FakeGetHeaderDataUseCaseWithSow }],
    }),
  ],
};

const FakeGetHeaderDataUseCaseWithBoar: Partial<GetHeaderDataUseCase> = {
  execute: () =>
    ({
      value: signal<AnimalSheetHeader>({
        animal: {
          id: 2,
          sex: Sex.Male,

          parity: undefined,
          batch: {
            id: 'b3.42',
            name: 'B3.42',
          },
          structure: {
            id: 8,
            name: 'Verraterie',
            case: {
              id: 3,
              name: 'case 3',
            },
          },
          physiologicalState: {
            i18nKey: 'fattening',
            startDate: new Date('2024-10-05'),
          },
        },

        alerts: [] as Alert[],
      }),
      isLoading: signal(false),
      error: signal(null),
    }) as unknown as ReturnType<GetHeaderDataUseCase['execute']>,
};
export const Boar: Story = {
  decorators: [
    applicationConfig({
      providers: [{ provide: GetHeaderDataUseCase, useValue: FakeGetHeaderDataUseCaseWithBoar }],
    }),
  ],
};

const FakeGetHeaderDataUseCaseLoading: Partial<GetHeaderDataUseCase> = {
  execute: () =>
    ({
      isLoading: signal(true),
      value: signal(null),
      error: signal(null),
    }) as unknown as ReturnType<GetHeaderDataUseCase['execute']>,
};
export const Loading: Story = {
  decorators: [
    applicationConfig({
      providers: [{ provide: GetHeaderDataUseCase, useValue: FakeGetHeaderDataUseCaseLoading }],
    }),
  ],
};

const fakeNotifications: AnimalNotification[] = [
  {
    eventType: AnimalEventEnum.NO_SLAUGHTERHOUSE,
    content: 'Abcès, boiterie',
    date: new Date(),
  },
  {
    eventType: AnimalEventEnum.OBSERVATION_CURRENT_CYCLE,
    content: 'Truie agressive',
    date: new Date(),
  },
  {
    eventType: AnimalEventEnum.OBSERVATION_CURRENT_CYCLE,
    content: 'Mise bas de nuit',
    date: new Date(),
  },
];
const FakeGetNotificationsDataUseCase: Partial<GetNotificationsDataUseCase> = {
  execute: () =>
    ({
      value: signal<AnimalNotification[]>(fakeNotifications),
    }) as ResourceRef<AnimalNotification[]>,
};
export const WithNotifications: Story = {
  decorators: [
    applicationConfig({
      providers: [
        { provide: GetHeaderDataUseCase, useValue: FakeGetHeaderDataUseCaseWithSow },
        {
          provide: GetNotificationsCountUseCase,
          useValue: {
            execute: () => ({ value: signal(fakeNotifications.length) }),
          } as GetNotificationsCountUseCase,
        },
        { provide: GetNotificationsDataUseCase, useValue: FakeGetNotificationsDataUseCase },
      ],
    }),
  ],
};
