import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, inject, output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ViewportService } from '@cooperl/design-system';
import { TestIdDirective } from '@cooperl/design-system/directive/test-id';
import { GetHeaderDataUseCase, SelectedAnimalStore } from '@cooperl/farming-suite/animal-sheet/domain';
import { Sex } from '@cooperl/utils';
import { TranslocoDirective } from '@jsverse/transloco';
import { AlertComponent } from '../alert/alert.component';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { OpenLogbookButtonComponent } from '../logbook/open-logbook-button.component';
import { PorkInfoComponent } from '../pork-info/pork-info.component';

@Component({
  selector: 'farming-suite-animal-sheet-header',
  imports: [
    // Angular
    NgTemplateOutlet,
    // External
    TranslocoDirective,
    MatButton,
    MatIcon,
    MatPrefix,
    MatMenuModule,
    MatIconButton,
    // Internal
    HeaderNavComponent,
    PorkInfoComponent,
    AlertComponent,
    OpenLogbookButtonComponent,
    TestIdDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.sticky]': 'stickyModeActive',
    '[class.handset]': 'isHandset()',
    '[style.--animation-duration]': 'animationDuration + "ms"',
  },
})
export class HeaderComponent implements AfterViewInit {
  public readonly heightChange = output<number>();

  protected stickyModeActive = false;
  protected readonly animationDuration = 200;

  protected readonly headerResource = inject(GetHeaderDataUseCase).execute();
  protected readonly animalId = inject(SelectedAnimalStore).animalId;
  protected readonly isHandset = inject(ViewportService).isHandsetViewport;
  protected readonly title = computed(() => {
    const prefix = 'farming-suite.animal-sheet.components.header.title';

    let suffix = '';
    if (this.headerResource.isLoading() || this.headerResource.error()) {
      suffix = 'animal';
    } else {
      suffix = this.headerResource.value()?.animal.sex === Sex.Female ? 'sow' : 'boar';
    }

    return `${prefix}.${suffix}`;
  });
  protected readonly structure = computed(() => {
    const structure = this.headerResource.value()?.animal.structure;
    return structure ? `${structure.name}, ${structure.case.name}` : '';
  });
  protected readonly physiologicalStateI18nKey = computed(() => {
    const prefix = 'farming-suite.animals.sow.physiological-state';

    let suffix = '';
    if (this.headerResource.isLoading()) {
      return 'common.loading';
    } else if (this.headerResource.error()) {
      suffix = 'unknown';
    } else {
      suffix = this.headerResource.value()?.animal.physiologicalState.i18nKey ?? 'unknown';
    }

    return `${prefix}.${suffix}`;
  });

  private readonly _scrollThreshold = 100;
  private readonly _element = inject(ElementRef);

  public ngAfterViewInit() {
    this._computeHeaderHeight();
  }

  @HostListener('window:scroll')
  protected _computeStickyMode(): void {
    const scrollPosition = Math.round(window.scrollY);

    this.stickyModeActive = scrollPosition > this._scrollThreshold;

    this._computeHeaderHeight();
  }

  private _computeHeaderHeight(): void {
    // Convert sticky header to number, this way when it's true, we will add the threshold height to the header height
    const thresholdHeight = +this.stickyModeActive * this._scrollThreshold;
    const headerHeight = this._element.nativeElement?.getBoundingClientRect().height + thresholdHeight;
    this.heightChange.emit(headerHeight);
  }
}
