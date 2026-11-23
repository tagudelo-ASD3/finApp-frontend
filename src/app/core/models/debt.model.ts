export interface Debt {
  id: string;
  name: string;
  lender: string;
  initials: string;
  originalAmount: number;
  balance: number;
  /** Monthly interest rate in percent ("mes vencido"). */
  monthlyRate: number;
  installment: number;
  dueDay: number | null;
  cutoffDay: number | null;
}

export type DebtStatus = 'paid' | 'due-soon' | 'on-track';

export interface RecurringPayment {
  id: string;
  name: string;
  amount: number;
  dueDay: number;
}

export interface ScheduledPayment {
  id: string;
  name: string;
  amount: number;
  date: Date;
  daysLeft: number;
}

export type PlanStrategy = 'avalanche' | 'snowball';

export interface PaymentPlan {
  strategy: PlanStrategy;
  months: number;
  totalInterest: number;
  order: Debt[];
  /** Total debt left at the end of each month, starting with the current balance. */
  balances: number[];
  feasible: boolean;
}

/** One upcoming installment split into interest and principal. */
export interface InstallmentRow {
  date: Date;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

/** Cell of the payment calendar. */
export interface CalendarDay {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  payments: ScheduledPayment[];
}
