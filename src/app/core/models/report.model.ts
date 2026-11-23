/** Part of a total (a category or an account) with its percentage. */
export interface Share {
  id: string;
  label: string;
  initials?: string;
  amount: number;
  percent: number;
}

/** Income and expenses of one month. */
export interface MonthTotals {
  label: string;
  income: number;
  expense: number;
}
