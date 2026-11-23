import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { UiService } from '../../../../core/services/ui.service';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency.pipe';
import { nextDateForDay } from '../../../../core/utils/date.utils';
import { DebtsService } from '../../../../core/services/debts.service';
import { InstallmentRow } from '../../../../core/models/debt.model';

const SCHEDULE_MONTHS = 6;

@Component({
  selector: 'fa-debt-detail',
  imports: [DatePipe, RouterLink, TranslatePipe, PageHeader, CopCurrencyPipe],
  templateUrl: './debt-detail.html',
  styleUrl: './debt-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtDetail {
  private readonly ui = inject(UiService);
  protected readonly debts = inject(DebtsService);

  /** Route parameter :id. */
  readonly id = input.required<string>();

  protected readonly debt = computed(() => this.debts.byId(this.id()));

  protected readonly nextDue = computed(() => {
    const debt = this.debt();
    return debt?.dueDay ? nextDateForDay(debt.dueDay) : null;
  });

  /** Interest the debt generates this month at its current balance. */
  protected readonly monthlyInterest = computed(() => {
    const debt = this.debt();
    return debt ? Math.round(debt.balance * (debt.monthlyRate / 100)) : 0;
  });

  /** Upcoming installments: how much goes to interest and how much lowers the balance. */
  protected readonly schedule = computed<InstallmentRow[]>(() => {
    const debt = this.debt();
    const due = this.nextDue();
    if (!debt || !due || debt.balance <= 0 || debt.installment <= 0) {
      return [];
    }
    const rows: InstallmentRow[] = [];
    let balance = debt.balance;
    for (let month = 0; month < SCHEDULE_MONTHS && balance > 0; month++) {
      const interest = Math.round(balance * (debt.monthlyRate / 100));
      const payment = Math.min(debt.installment, balance + interest);
      balance = Math.max(balance + interest - payment, 0);
      rows.push({
        date: new Date(due.getFullYear(), due.getMonth() + month, due.getDate()),
        payment,
        interest,
        principal: payment - interest,
        balance,
      });
    }
    return rows;
  });

  protected registerPayment(): void {
    this.debts.registerPayment(this.id());
    this.ui.notify('debts.paymentRegistered');
  }
}
