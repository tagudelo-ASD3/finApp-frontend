import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UiService } from '../../../core/services/ui.service';
import { Icon } from '../icon/icon';

/** Overlay window used by every form: dark backdrop, title and close button. */
@Component({
  selector: 'fa-dialog',
  imports: [TranslatePipe, Icon],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
  host: { '(document:keydown.escape)': 'ui.close()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  protected readonly ui = inject(UiService);

  readonly title = input.required<string>();
  readonly width = input(460);
}
