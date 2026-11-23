import { Category } from './movement.model';

export interface BudgetLimit {
  categoryId: string;
  limit: number;
}

export type BudgetStatus = 'good' | 'near' | 'over';

export interface CategoryBudget {
  category: Category;
  limit: number;
  spent: number;
  percent: number;
  status: BudgetStatus;
}

export interface WeeklySpending {
  label: string;
  amount: number;
}
