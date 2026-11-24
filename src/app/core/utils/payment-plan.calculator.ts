import { Debt, DebtBalance, PaymentPlan, PlanStrategy } from '../models/debt.model';

const MAX_MONTHS = 120;

// Each month adds interest, pays every installment and sends the money left to one debt at a time:
// highest rate first (avalanche) or smallest balance first (snowball).
export function buildPaymentPlan(debts: Debt[], monthlyBudget: number, strategy: PlanStrategy): PaymentPlan {
  const active: DebtBalance[] = debts
    .filter((debt) => debt.balance > 0)
    .map((debt) => ({ debt, balance: debt.balance }));

  const order = [...active].sort((a, b) =>
    strategy === 'avalanche'
      ? b.debt.monthlyRate - a.debt.monthlyRate || a.balance - b.balance
      : a.balance - b.balance,
  );

  const minimumPayment = active.reduce((total, item) => total + item.debt.installment, 0);
  let remaining = active.reduce((total, item) => total + item.balance, 0);
  const balances = [remaining];
  let totalInterest = 0;
  let months = 0;

  if (active.length === 0 || monthlyBudget < minimumPayment || monthlyBudget <= 0) {
    return { strategy, months: 0, totalInterest: 0, order: order.map((item) => item.debt), balances, feasible: active.length === 0 };
  }

  while (remaining > 1 && months < MAX_MONTHS) {
    months++;

    for (const item of order) {
      const interest = item.balance * (item.debt.monthlyRate / 100);
      item.balance += interest;
      totalInterest += interest;
    }

    let money = monthlyBudget;
    for (const item of order) {
      const payment = Math.min(item.debt.installment, item.balance, money);
      item.balance -= payment;
      money -= payment;
    }

    for (const item of order) {
      if (money <= 0) {
        break;
      }
      const extra = Math.min(money, item.balance);
      item.balance -= extra;
      money -= extra;
    }

    remaining = order.reduce((total, item) => total + Math.max(item.balance, 0), 0);
    balances.push(Math.round(remaining));
  }

  return {
    strategy,
    months,
    totalInterest: Math.round(totalInterest),
    order: order.map((item) => item.debt),
    balances,
    feasible: remaining <= 1,
  };
}
