import { Injectable, computed } from '@angular/core';
import { persistedSignal } from '../utils/persisted-signal';
import { dateForDay, daysBetween, daysInMonth, nextDateForDay } from '../utils/date.utils';
import {
  DEBTS_MOCK,
  INTEREST_PAID_THIS_YEAR_MOCK,
  RECURRING_PAYMENTS_MOCK,
} from '../../../mocks/debts.mock';
import { Debt, DebtStatus, PlanStrategy, RecurringPayment, ScheduledPayment } from '../models/debt.model';
import { buildPaymentPlan } from '../utils/payment-plan.calculator';

const DUE_SOON_DAYS = 5;

@Injectable({ providedIn: 'root' })
export class DebtsService {
  readonly debts = persistedSignal<Debt[]>('debts', DEBTS_MOCK);
  readonly recurringPayments: readonly RecurringPayment[] = RECURRING_PAYMENTS_MOCK;
  readonly interestPaidThisYear = INTEREST_PAID_THIS_YEAR_MOCK;
  readonly planBudget = persistedSignal<number>('plan-budget', 900000);
  readonly activePlan = persistedSignal<PlanStrategy | null>('active-plan', null);

  readonly activeDebts = computed(() => this.debts().filter((debt) => debt.balance > 0));
  readonly totalDebt = computed(() => this.activeDebts().reduce((total, debt) => total + debt.balance, 0));
  readonly minimumMonthlyPayment = computed(() =>
    this.activeDebts().reduce((total, debt) => total + debt.installment, 0),
  );

  readonly totalPaidPercent = computed(() => {
    const original = this.activeDebts().reduce((total, debt) => total + debt.originalAmount, 0);
    return original > 0 ? Math.round((1 - this.totalDebt() / original) * 100) : 100;
  });

  /** Upcoming debt installments and fixed payments, soonest first. */
  readonly upcomingPayments = computed<ScheduledPayment[]>(() => {
    const today = new Date();
    const debtPayments = this.activeDebts()
      .filter((debt) => debt.dueDay !== null && debt.installment > 0)
      .map((debt) => ({ id: debt.id, name: debt.name, amount: debt.installment, dueDay: debt.dueDay as number }));

    return [...debtPayments, ...this.recurringPayments]
      .map((payment) => {
        const date = nextDateForDay(payment.dueDay, today);
        return { id: payment.id, name: payment.name, amount: payment.amount, date, daysLeft: daysBetween(today, date) };
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  });

  readonly nextPayment = computed(() => this.upcomingPayments().at(0));

  readonly paymentsThisMonth = computed(() => {
    const today = new Date();
    return this.paymentsInMonth(today.getFullYear(), today.getMonth()).reduce(
      (total, payment) => total + payment.amount,
      0,
    );
  });

  byId(id: string): Debt | undefined {
    return this.debts().find((debt) => debt.id === id);
  }

  paidPercent(debt: Debt): number {
    return debt.originalAmount > 0 ? Math.round((1 - debt.balance / debt.originalAmount) * 100) : 0;
  }

  daysUntilDue(debt: Debt): number | null {
    return debt.dueDay === null ? null : daysBetween(new Date(), nextDateForDay(debt.dueDay));
  }

  status(debt: Debt): DebtStatus {
    if (debt.balance <= 0) {
      return 'paid';
    }
    const days = this.daysUntilDue(debt);
    return days !== null && days <= DUE_SOON_DAYS ? 'due-soon' : 'on-track';
  }

  /** Every payment that falls inside the given month, for the calendar. */
  paymentsInMonth(year: number, month: number): ScheduledPayment[] {
    const today = new Date();
    const lastDay = daysInMonth(year, month);
    const items = [
      ...this.activeDebts()
        .filter((debt) => debt.dueDay !== null && debt.installment > 0)
        .map((debt) => ({ id: debt.id, name: debt.name, amount: debt.installment, dueDay: debt.dueDay as number })),
      ...this.recurringPayments,
    ];
    return items
      .map((item) => {
        const date = dateForDay(year, month, Math.min(item.dueDay, lastDay));
        return { id: item.id, name: item.name, amount: item.amount, date, daysLeft: daysBetween(today, date) };
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  plan(strategy: PlanStrategy, monthlyBudget: number) {
    return buildPaymentPlan(this.debts(), monthlyBudget, strategy);
  }

  add(debt: Omit<Debt, 'id' | 'initials' | 'originalAmount'>): void {
    const initials = debt.name.trim().slice(0, 2).toUpperCase();
    this.debts.update((debts) => [
      ...debts,
      { ...debt, id: crypto.randomUUID(), initials, originalAmount: debt.balance },
    ]);
  }

  registerPayment(debtId: string): void {
    this.debts.update((debts) =>
      debts.map((debt) =>
        debt.id === debtId ? { ...debt, balance: Math.max(debt.balance - debt.installment, 0) } : debt,
      ),
    );
  }
}
