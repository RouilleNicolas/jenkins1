import { BooleanInput } from '@angular/cdk/coercion';
import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { TestIdDirective } from '@cooperl/design-system/directive/test-id';
import { Alert } from '@cooperl/farming-suite/animal-sheet/domain';
import { TranslocoDirective } from '@jsverse/transloco';
import { TranslocoDatePipe } from '@jsverse/transloco-locale';

@Component({
  selector: 'farming-suite-animal-sheet-alert',
  standalone: true,
  imports: [
    //Angular
    NgTemplateOutlet,
    //External
    MatIcon,
    TranslocoDirective,
    TranslocoDatePipe,
    MatExpansionModule,
    //Internal
    TestIdDirective,
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  host: {
    '[class.parent-alert]': 'childrenAlerts().length > 0',
  },
})
export class AlertComponent implements OnInit {
  public readonly title = input.required<Alert['title']>();
  public readonly updateDate = input<Alert['updateDate']>();
  public readonly childrenAlerts = input<Alert[]>([]);
  public readonly hideIcon = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  public ngOnInit(): void {
    const inputsAreInvalid = !this.updateDate() && !this.childrenAlerts().length;
    if (inputsAreInvalid) {
      throw new Error('NG0950: At least one of theses inputs is required (updateDate, childrenAlerts)');
    }
  }
}
