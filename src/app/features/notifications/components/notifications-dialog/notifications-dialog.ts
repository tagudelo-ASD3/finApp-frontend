import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Dialog } from '../../../../shared/components/dialog/dialog';
import { Icon } from '../../../../shared/components/icon/icon';
import { RelativeDatePipe } from '../../../../shared/pipes/relative-date.pipe';
import { AppNotification } from '../../../../core/models/notification.model';
import { NotificationsService } from '../../../../core/services/notifications.service';

const KIND_ICONS: Record<AppNotification['kind'], string> = {
  detected: 'zap',
  payment: 'calendar',
  budget: 'pie',
  tip: 'sparkles',
};

@Component({
  selector: 'fa-notifications-dialog',
  imports: [TranslatePipe, Dialog, Icon, RelativeDatePipe],
  templateUrl: './notifications-dialog.html',
  styleUrl: './notifications-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsDialog {
  protected readonly notifications = inject(NotificationsService);
  protected readonly icons = KIND_ICONS;
}
