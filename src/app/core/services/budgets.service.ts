import { Injectable, computed, inject } from '@angular/core';
import { persistedSignal } from '../utils/persisted-signal';
import { daysInMonth } from '../utils/date.utils';
import { BUDGET_LIMITS_MOCK } from '../../../mocks/budgets.mock';
import { MovementsService } from './movements.service';
import { BudgetLimit, BudgetStatus, CategoryBudget, WeeklySpending } from '../models/budget.model';

const NEAR_LIMIT_PERCENT = 80;

function statusFor(percent: number): BudgetStatus {
  if (percent > 100) {
    return 'over';
  }
  return percent >= NEAR_LIMIT_PERCENT ? 'near' : 'good';
}

@Injectable({ providedIn: 'root' })
export class BudgetsService {
  private readonly movements = inject(MovementsService);

  readonly limits = persistedSignal<BudgetLimit[]>('budget-limits', BUDGET_LIMITS_MOCK);

  private readonly monthExpenses = computed(() =>
    this.movements.thisMonth().filter((movement) => movement.type === 'expense'),
  );

  readonly items = computed<CategoryBudget[]>(() =>
    this.limits().map(({ categoryId, limit }) => {
      const spent = this.monthExpenses()
        .filter((movement) => movement.categoryId === categoryId)
        .reduce((total, movement) => total + movement.amount, 0);
      const percent = limit > 0 ? Math.round((spent / limit) * 100) : 0;
      return { category: this.movements.category(categoryId), limit, spent, percent, status: statusFor(percent) };
    }),
  );

  readonly totalLimit = computed(() => this.limits().reduce((total, item) => total + item.limit, 0));
  readonly totalSpent = computed(() => this.items().reduce((total, item) => total + item.spent, 0));
  readonly available = computed(() => Math.max(this.totalLimit() - this.totalSpent(), 0));
  readonly percentUsed = computed(() =>
    this.totalLimit() > 0 ? Math.round((this.totalSpent() / this.totalLimit()) * 100) : 0,
  );

  readonly daysLeft = computed(() => {
    const today = new Date();
    return daysInMonth(today.getFullYear(), today.getMonth()) - today.getDate();
  });

  readonly dailyAverage = computed(() => Math.round(this.totalSpent() / new Date().getDate()));

  readonly dailyIdeal = computed(() => {
    const today = new Date();
    return Math.round(this.totalLimit() / daysInMonth(today.getFullYear(), today.getMonth()));
  });

  readonly paceDifference = computed(() =>
    this.dailyIdeal() > 0 ? Math.round((this.dailyAverage() / this.dailyIdeal() - 1) * 100) : 0,
  );

  readonly topCategory = computed(() =>
    [...this.items()].sort((a, b) => b.spent - a.spent).at(0),
  );

  readonly mostExceeded = computed(() =>
    [...this.items()].filter((item) => item.status === 'over').sort((a, b) => b.percent - a.percent).at(0),
  );

  readonly exceededCount = computed(() => this.items().filter((item) => item.status === 'over').length);

  readonly weekly = computed<WeeklySpending[]>(() => {
    const weeks = [0, 0, 0, 0];
    for (const movement of this.monthExpenses()) {
      const weekIndex = Math.min(Math.floor((new Date(movement.date).getDate() - 1) / 7), 3);
      weeks[weekIndex] += movement.amount;
    }
    return weeks.map((amount, index) => ({ label: `${index + 1}`, amount }));
  });

  updateLimits(limits: BudgetLimit[]): void {
    this.limits.set(limits);
  }
}
