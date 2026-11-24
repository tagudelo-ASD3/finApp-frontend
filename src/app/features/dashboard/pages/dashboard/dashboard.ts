import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CountKeyPipe } from '../../../../shared/pipes/count-key.pipe';
import { UiService } from '../../../../core/services/ui.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency.pipe';
import { RelativeDatePipe } from '../../../../shared/pipes/relative-date.pipe';
import { AccountsService } from '../../../../core/services/accounts.service';
import { BudgetsService } from '../../../../core/services/budgets.service';
import { DebtsService } from '../../../../core/services/debts.service';
import { MovementsService } from '../../../../core/services/movements.service';
import { ProfileService } from '../../../../core/services/profile.service';
import { ReportsService } from '../../../../core/services/reports.service';
import { MonthAmounts } from '../../../../core/models/report.model';

@Component({
  selector: 'fa-dashboard',
  imports: [DatePipe, RouterLink, TranslatePipe, Icon, PageHeader, CopCurrencyPipe, RelativeDatePipe, CountKeyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  protected readonly ui = inject(UiService);
  protected readonly accounts = inject(AccountsService);
  protected readonly movements = inject(MovementsService);
  protected readonly budgets = inject(BudgetsService);
  protected readonly debts = inject(DebtsService);
  private readonly reports = inject(ReportsService);
  private readonly profile = inject(ProfileService).profile;

  protected readonly today = new Date();

  protected readonly greetingKey = computed(() => {
    const hour = this.today.getHours();
    if (hour < 12) {
      return 'dashboard.goodMorning';
    }
    return hour < 19 ? 'dashboard.goodAfternoon' : 'dashboard.goodEvening';
  });

  protected readonly firstName = computed(() => this.profile().fullName.split(' ')[0]);

  protected readonly recentMovements = computed(() => this.movements.all().slice(0, 5));

  protected readonly incomeChange = computed(() => this.changeVsLastMonth('income'));
  protected readonly expenseChange = computed(() => this.changeVsLastMonth('expense'));

  protected readonly incomeBars = computed(() => this.toBars(this.reports.history().map((month) => month.income)));
  protected readonly expenseBars = computed(() => this.toBars(this.reports.history().map((month) => month.expense)));

  protected readonly topBudgets = computed(() =>
    [...this.budgets.items()].sort((a, b) => b.percent - a.percent).slice(0, 3),
  );

  protected readonly plan = computed(() => this.debts.plan('avalanche', this.debts.planBudget()));

  protected payNextPayment(): void {
    const next = this.debts.nextPayment();
    if (next && this.debts.byId(next.id)) {
      this.debts.registerPayment(next.id);
    }
    this.ui.notify('dashboard.paymentRegistered');
  }

  private changeVsLastMonth(type: keyof MonthAmounts): number {
    const history = this.reports.history();
    const current = history.at(-1)?.[type] ?? 0;
    const previous = history.at(-2)?.[type] ?? 0;
    return previous > 0 ? Math.round(((current - previous) / previous) * 100) : 0;
  }

  private toBars(values: number[]): number[] {
    const max = Math.max(...values, 1);
    return values.map((value) => Math.max(Math.round((value / max) * 100), 12));
  }
}
