import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { UiService } from '../../../core/services/ui.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { Icon } from '../icon/icon';

/** Page title with the search box, notifications bell and the page's own action buttons. */
@Component({
  selector: 'fa-page-header',
  imports: [RouterLink, TranslatePipe, Icon],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  private readonly router = inject(Router);
  private readonly ui = inject(UiService);
  private readonly notifications = inject(NotificationsService);

  readonly title = input.required<string>();
  readonly subtitle = input<string | null>('');
  readonly backLink = input<string | null>(null);
  readonly backLabel = input<string>('');

  protected readonly query = signal('');
  protected readonly unread = computed(() => this.notifications.unreadCount());

  protected search(): void {
    const q = this.query().trim();
    void this.router.navigate(['/movements'], { queryParams: q ? { q } : {} });
  }

  protected openNotifications(): void {
    this.ui.open('notifications');
  }
}
