import { Component, computed, inject, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { ViewportService } from '@cooperl/design-system';
import { TranslocoDirective } from '@jsverse/transloco';
import { formatDistanceToNowStrict } from 'date-fns';
import { InformationComponent } from '../information/information.component';

@Component({
  selector: 'farming-suite-animal-sheet-start-career',
  imports: [
    // Angular
    // External
    MatCard,
    MatCardHeader,
    MatCardContent,
    TranslocoDirective,
    // Internal
    InformationComponent,
  ],
  templateUrl: './start-career.component.html',
  styleUrl: './start-career.component.scss',
  host: {
    '[class.handset]': 'isHandset()',
  },
})
export class StartCareerComponent {
  public readonly firstIA = input.required<Date>();
  public readonly firstGivingBirth = input.required<Date>();

  public readonly durationIA = computed(() => formatDistanceToNowStrict(this.firstIA(), { unit: 'month' }));
  public readonly durationGivingBirth = computed(() => formatDistanceToNowStrict(this.firstGivingBirth(), { unit: 'month' }));
  protected readonly isHandset = inject(ViewportService).isHandsetViewport;
}
