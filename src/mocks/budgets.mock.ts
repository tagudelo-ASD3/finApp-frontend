import { BudgetLimit } from '../app/core/models/budget.model';

// Monthly limits per category; together they add up to $ 2.410.000.
export const BUDGET_LIMITS_MOCK: BudgetLimit[] = [
  { categoryId: 'groceries', limit: 600000 },
  { categoryId: 'home', limit: 950000 },
  { categoryId: 'transport', limit: 250000 },
  { categoryId: 'dining', limit: 150000 },
  { categoryId: 'subscriptions', limit: 60000 },
  { categoryId: 'health', limit: 100000 },
  { categoryId: 'leisure', limit: 200000 },
  { categoryId: 'other', limit: 100000 },
];
