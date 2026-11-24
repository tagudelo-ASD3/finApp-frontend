import { Injectable, computed } from '@angular/core';
import { persistedSignal } from '../utils/persisted-signal';
import { dateForDay, daysBetween, daysInMonth, nextDateForDay } from '../utils/date.utils';
import { buildPaymentPlan } from '../utils/payment-plan.calculator';
import { DEBTS_MOCK, INTEREST_PAID_THIS_YEAR_MOCK, RECURRING_PAYMENTS_MOCK } from '../../../mocks/debts.mock';
import {
  Debt,
  DebtStatus,
  NewDebt,
  PaymentPlan,
  PlanStrategy,
  PlanSuggestion,
  RecurringPayment,
  ScheduledPayment,
} from '../models/debt.model';

const DUE_SOON_DAYS = 5;

@Injectable({ providedIn: 'root' })
export class DebtsService {
  readonly debts = persistedSignal<Debt[]>('debts', DEBTS_MOCK);
  readonly planBudget = persistedSignal<number>('plan-budget', 1100000);
  readonly activePlan = persistedSignal<PlanStrategy | null>('active-plan', null);
  readonly interestPaidThisYear = INTEREST_PAID_THIS_YEAR_MOCK;

  readonly activeDebts = computed(() => this.debts().filter((debt) => debt.balance > 0));
  readonly totalDebt = computed(() => this.activeDebts().reduce((total, debt) => total + debt.balance, 0));
  readonly minimumMonthlyPayment = computed(() =>
    this.activeDebts().reduce((total, debt) => total + debt.installment, 0),
  );

  readonly totalPaidPercent = computed(() => {
    const original = this.activeDebts().reduce((total, debt) => total + debt.originalAmount, 0);
    return original > 0 ? Math.round((1 - this.totalDebt() / original) * 100) : 100;
  });

  readonly upcomingPayments = computed<ScheduledPayment[]>(() => {
    const today = new Date();
    return this.toSchedule(this.monthlyPayments(), (payment) => nextDateForDay(payment.dueDay, today));
  });

  readonly nextPayment = computed(() => this.upcomingPayments().at(0));
  readonly nextDebtPayment = computed(() => this.upcomingPayments().find((payment) => this.byId(payment.id)));

  readonly minimumPlan = computed(() => this.plan('avalanche', this.minimumMonthlyPayment()));

  readonly suggestion = computed<PlanSuggestion | null>(() => {
    const budget = this.planBudget();
    const extra = budget - this.minimumMonthlyPayment();
    const target = this.plan('avalanche', budget).order.at(0);
    if (extra <= 0 || !target) {
      return null;
    }
    return { extra, debtName: target.name, savings: this.interestSaved('avalanche', budget) };
  });

  private readonly monthlyPayments = computed<RecurringPayment[]>(() => [
    ...this.activeDebts()
      .filter((debt) => debt.dueDay !== null && debt.installment > 0)
      .map((debt) => ({ id: debt.id, name: debt.name, amount: debt.installment, dueDay: debt.dueDay ?? 1 })),
    ...RECURRING_PAYMENTS_MOCK,
  ]);

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

  paymentsInMonth(year: number, month: number): ScheduledPayment[] {
    const lastDay = daysInMonth(year, month);
    return this.toSchedule(this.monthlyPayments(), (payment) =>
      dateForDay(year, month, Math.min(payment.dueDay, lastDay)),
    );
  }

  plan(strategy: PlanStrategy, monthlyBudget: number): PaymentPlan {
    return buildPaymentPlan(this.debts(), monthlyBudget, strategy);
  }

  interestSaved(strategy: PlanStrategy, monthlyBudget: number): number {
    const plan = this.plan(strategy, monthlyBudget);
    return plan.feasible ? Math.max(this.minimumPlan().totalInterest - plan.totalInterest, 0) : 0;
  }

  add(debt: NewDebt): void {
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

  private toSchedule(payments: RecurringPayment[], dateOf: (payment: RecurringPayment) => Date): ScheduledPayment[] {
    const today = new Date();
    return payments
      .map((payment) => {
        const date = dateOf(payment);
        return { id: payment.id, name: payment.name, amount: payment.amount, date, daysLeft: daysBetween(today, date) };
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }
}
