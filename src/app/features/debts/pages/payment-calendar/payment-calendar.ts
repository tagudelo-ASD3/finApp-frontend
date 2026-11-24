import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { CountKeyPipe } from '../../../../shared/pipes/count-key.pipe';
import { UiService } from '../../../../core/services/ui.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency.pipe';
import { daysInMonth, isSameDay } from '../../../../core/utils/date.utils';
import { CalendarDay } from '../../../../core/models/debt.model';
import { DebtsService } from '../../../../core/services/debts.service';

@Component({
  selector: 'fa-payment-calendar',
  imports: [DatePipe, TranslatePipe, Icon, PageHeader, CopCurrencyPipe, CountKeyPipe],
  templateUrl: './payment-calendar.html',
  styleUrl: './payment-calendar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentCalendar {
  protected readonly ui = inject(UiService);
  private readonly debts = inject(DebtsService);

  protected readonly weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  protected readonly month = signal(new Date(new Date().getFullYear(), new Date().getMonth(), 1));

  protected readonly payments = computed(() =>
    this.debts.paymentsInMonth(this.month().getFullYear(), this.month().getMonth()),
  );

  protected readonly monthTotal = computed(() => this.payments().reduce((total, payment) => total + payment.amount, 0));

  protected readonly days = computed<CalendarDay[]>(() => {
    const first = this.month();
    const today = new Date();
    const offset = (first.getDay() + 6) % 7;
    const totalCells = Math.ceil((offset + daysInMonth(first.getFullYear(), first.getMonth())) / 7) * 7;
    return Array.from({ length: totalCells }, (_, index) => {
      const date = new Date(first.getFullYear(), first.getMonth(), index - offset + 1);
      return {
        date,
        inMonth: date.getMonth() === first.getMonth(),
        isToday: isSameDay(date, today),
        payments: this.payments().filter((payment) => isSameDay(payment.date, date)),
      };
    });
  });

  protected changeMonth(step: number): void {
    const current = this.month();
    this.month.set(new Date(current.getFullYear(), current.getMonth() + step, 1));
  }
}
