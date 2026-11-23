import { Debt, RecurringPayment } from '../app/core/models/debt.model';

export const DEBTS_MOCK: Debt[] = [
  {
    id: 'visa',
    name: 'Tarjeta de crédito Visa',
    lender: 'Bancolombia',
    initials: 'VS',
    originalAmount: 3070000,
    balance: 2150000,
    monthlyRate: 2.3,
    installment: 450000,
    dueDay: 15,
    cutoffDay: 30,
  },
  {
    id: 'davivienda',
    name: 'Crédito libre inversión',
    lender: 'Davivienda',
    initials: 'DV',
    originalAmount: 7360000,
    balance: 4270000,
    monthlyRate: 1.6,
    installment: 380000,
    dueDay: 28,
    cutoffDay: 13,
  },
  {
    id: 'family',
    name: 'Préstamo familiar',
    lender: 'Registro manual',
    initials: 'EF',
    originalAmount: 1500000,
    balance: 0,
    monthlyRate: 0,
    installment: 0,
    dueDay: null,
    cutoffDay: null,
  },
];

/** Fixed monthly payments that are not debts but appear in the payment calendar. */
export const RECURRING_PAYMENTS_MOCK: RecurringPayment[] = [
  { id: 'rent', name: 'Arriendo', amount: 900000, dueDay: 5 },
  { id: 'netflix', name: 'Netflix', amount: 38900, dueDay: 20 },
];

export const INTEREST_PAID_THIS_YEAR_MOCK = 912400;
