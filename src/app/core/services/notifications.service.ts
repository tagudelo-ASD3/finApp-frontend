import { Injectable, computed, inject } from '@angular/core';
import { persistedSignal } from '../utils/persisted-signal';
import { formatCop } from '../utils/currency.utils';
import { countKey } from '../utils/plural.utils';
import { recentMoment } from '../utils/date.utils';
import { READ_NOTIFICATIONS_MOCK } from '../../../mocks/notifications.mock';
import { AccountsService } from './accounts.service';
import { BudgetsService } from './budgets.service';
import { DebtsService } from './debts.service';
import { MovementsService } from './movements.service';
import { AppNotification, NotificationDraft } from '../models/notification.model';
// Texts are built from the current data so every amount matches the other screens.
@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private readonly movements = inject(MovementsService);
  private readonly accounts = inject(AccountsService);
  private readonly budgets = inject(BudgetsService);
  private readonly debts = inject(DebtsService);
  private readonly readIds = persistedSignal<string[]>('notifications-read', READ_NOTIFICATIONS_MOCK);

  readonly notifications = computed<AppNotification[]>(() => {
    const read = new Set(this.readIds());
    return [this.detected(), this.payment(), this.budget(), this.tip()]
      .filter((draft): draft is NotificationDraft => draft !== null)
      .map((draft) => ({ ...draft, read: read.has(draft.id) }))
      .sort((a, b) => b.date.localeCompare(a.date));
  });

  readonly unreadCount = computed(() => this.notifications().filter((item) => !item.read).length);

  markAllAsRead(): void {
    this.readIds.set(this.notifications().map((item) => item.id));
  }
  private readonly detected = computed<NotificationDraft | null>(() => {
    const movement = this.movements.all().find((item) => item.source === 'auto');
    if (!movement) {
      return null;
    }
    return {
      id: `detected:${movement.id}`,
      kind: 'detected',
      titleKey: 'notifications.detected.title',
      messageKey: `notifications.detected.${movement.type}`,
      params: {
        account: this.accounts.byId(movement.accountId)?.name ?? '',
        amount: formatCop(movement.amount),
        description: movement.description,
      },
      date: movement.date,
    };
  });
  private readonly payment = computed<NotificationDraft | null>(() => {
    const next = this.debts.nextDebtPayment();
    if (!next) {
      return null;
    }
    return {
      id: `payment:${next.id}:${next.date.toDateString()}`,
      kind: 'payment',
      titleKey: 'notifications.payment.title',
      messageKey: countKey('notifications.payment.message', next.daysLeft),
      params: { name: next.name, amount: formatCop(next.amount), days: next.daysLeft },
      date: recentMoment(0, 8),
    };
  });
  private readonly budget = computed<NotificationDraft | null>(() => {
    const over = this.budgets
      .items()
      .filter((item) => item.status === 'over')
      .sort((a, b) => b.percent - a.percent)
      .at(0);
    if (!over) {
      return null;
    }
    const lastExpense = this.movements.thisMonth().find((item) => item.categoryId === over.category.id);
    return {
      id: `budget:${over.category.id}:${over.limit}`,
      kind: 'budget',
      titleKey: 'notifications.budget.title',
      messageKey: 'notifications.budget.message',
      params: { category: over.category.name, spent: formatCop(over.spent), limit: formatCop(over.limit) },
      date: lastExpense?.date ?? recentMoment(0, 9),
    };
  });
  private readonly tip = computed<NotificationDraft | null>(() => {
    const saved = this.debts.interestSaved('avalanche', this.debts.planBudget());
    if (saved <= 0) {
      return null;
    }
    return {
      id: 'tip',
      kind: 'tip',
      titleKey: 'notifications.tip.title',
      messageKey: 'notifications.tip.message',
      params: { budget: formatCop(this.debts.planBudget()), amount: formatCop(saved) },
      date: recentMoment(3, 9),
    };
  });
}
