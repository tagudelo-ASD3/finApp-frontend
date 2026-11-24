export interface Share {
  id: string;
  label: string;
  initials?: string;
  amount: number;
  percent: number;
}

export interface MonthAmounts {
  income: number;
  expense: number;
}

export interface MonthTotals extends MonthAmounts {
  label: string;
}
