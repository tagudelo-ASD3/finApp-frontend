import { Injectable, computed } from '@angular/core';
import { persistedSignal } from '../utils/persisted-signal';
import { NOTIFICATIONS_MOCK } from '../../../mocks/notifications.mock';
import { AppNotification } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  readonly notifications = persistedSignal<AppNotification[]>('notifications', NOTIFICATIONS_MOCK);
  readonly unreadCount = computed(() => this.notifications().filter((item) => !item.read).length);

  markAllAsRead(): void {
    this.notifications.update((items) => items.map((item) => ({ ...item, read: true })));
  }
}
