import { Injectable, computed, inject } from '@angular/core';
import { MONTHLY_HISTORY_MOCK } from '../../../mocks/reports.mock';
import { AccountsService } from './accounts.service';
import { MovementsService } from './movements.service';
import { MonthTotals, Share } from '../models/report.model';

const TOP_CATEGORIES = 4;

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private readonly movements = inject(MovementsService);
  private readonly accounts = inject(AccountsService);

  private readonly expenses = computed(() =>
    this.movements.thisMonth().filter((movement) => movement.type === 'expense'),
  );

  readonly totalExpense = computed(() => this.movements.monthExpense());

  /** The biggest categories of the month, with the rest grouped as "Otros". */
  readonly byCategory = computed<Share[]>(() => {
    const totals = new Map<string, number>();
    for (const movement of this.expenses()) {
      totals.set(movement.categoryId, (totals.get(movement.categoryId) ?? 0) + movement.amount);
    }
    const sorted = [...totals.entries()].sort((a, b) => b[1] - a[1]);
    const total = this.totalExpense() || 1;
    const top = sorted.slice(0, TOP_CATEGORIES).map(([id, amount]) => ({
      id,
      label: this.movements.category(id).name,
      amount,
      percent: Math.round((amount / total) * 100),
    }));
    const restAmount = sorted.slice(TOP_CATEGORIES).reduce((sum, [, amount]) => sum + amount, 0);
    return restAmount > 0
      ? [...top, { id: 'rest', label: 'Otros', amount: restAmount, percent: Math.round((restAmount / total) * 100) }]
      : top;
  });

  readonly byAccount = computed<Share[]>(() => {
    const totals = new Map<string, number>();
    for (const movement of this.expenses()) {
      totals.set(movement.accountId, (totals.get(movement.accountId) ?? 0) + movement.amount);
    }
    const sorted = [...totals.entries()].sort((a, b) => b[1] - a[1]);
    const max = sorted.at(0)?.[1] ?? 1;
    return sorted.map(([id, amount]) => {
      const account = this.accounts.byId(id);
      return {
        id,
        label: account?.name ?? id,
        initials: account?.initials,
        amount,
        percent: Math.round((amount / max) * 100),
      };
    });
  });

  /** Income and expenses of the last six months, the current one last. */
  readonly history = computed<MonthTotals[]>(() => {
    const today = new Date();
    const monthName = new Intl.DateTimeFormat('es-CO', { month: 'short' });
    const months = [
      ...MONTHLY_HISTORY_MOCK,
      { income: this.movements.monthIncome(), expense: this.movements.monthExpense() },
    ];
    return months.map((totals, index) => {
      const date = new Date(today.getFullYear(), today.getMonth() - (months.length - 1 - index), 1);
      const label = monthName.format(date).replace('.', '');
      return { ...totals, label: label.charAt(0).toUpperCase() + label.slice(1) };
    });
  });

  readonly monthSavings = computed(() => this.movements.monthIncome() - this.movements.monthExpense());

  readonly savingsRate = computed(() => {
    const income = this.movements.monthIncome();
    return income > 0 ? Math.round((this.monthSavings() / income) * 100) : 0;
  });

  readonly averageExpense = computed(() => {
    const history = this.history();
    return Math.round(history.reduce((total, month) => total + month.expense, 0) / history.length);
  });

  readonly highestExpenseMonth = computed(() =>
    [...this.history()].sort((a, b) => b.expense - a.expense).at(0),
  );

  readonly chartMax = computed(() =>
    Math.max(...this.history().flatMap((month) => [month.income, month.expense]), 1),
  );
}
