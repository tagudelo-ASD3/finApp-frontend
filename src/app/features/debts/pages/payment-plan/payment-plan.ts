import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { UiService } from '../../../../core/services/ui.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency.pipe';
import { DebtsService } from '../../../../core/services/debts.service';
import { PlanComparison, PlanStrategy } from '../../../../core/models/debt.model';

const CHART_WIDTH = 600;
const CHART_HEIGHT = 200;

@Component({
  selector: 'fa-payment-plan',
  imports: [DecimalPipe, DatePipe, TranslatePipe, Icon, PageHeader, CopCurrencyPipe],
  templateUrl: './payment-plan.html',
  styleUrl: './payment-plan.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentPlanPage {
  private readonly ui = inject(UiService);
  protected readonly debts = inject(DebtsService);

  protected readonly strategies: PlanStrategy[] = ['avalanche', 'snowball'];
  protected readonly strategy = signal<PlanStrategy>(this.debts.activePlan() ?? 'avalanche');
  protected readonly chartWidth = CHART_WIDTH;
  protected readonly chartHeight = CHART_HEIGHT;

  protected readonly plans = computed<PlanComparison>(() => ({
    avalanche: this.debts.plan('avalanche', this.debts.planBudget()),
    snowball: this.debts.plan('snowball', this.debts.planBudget()),
    minimum: this.debts.minimumPlan(),
  }));

  protected readonly selected = computed(() => this.plans()[this.strategy()]);

  protected readonly finishDate = computed(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + this.selected().months, 1);
  });

  protected readonly savedVsMinimum = computed(() =>
    this.debts.interestSaved(this.strategy(), this.debts.planBudget()),
  );

  protected readonly monthsSaved = computed(() => Math.max(this.plans().minimum.months - this.selected().months, 0));

  protected readonly chartPath = computed(() => this.toPath(this.selected().balances));
  protected readonly minimumPath = computed(() => this.toPath(this.plans().minimum.balances));

  protected setBudget(value: number): void {
    this.debts.planBudget.set(Number.isFinite(value) ? Math.max(value, 0) : 0);
  }

  protected activate(): void {
    this.debts.activePlan.set(this.strategy());
    this.ui.notify('plan.activated');
  }

  private toPath(balances: number[]): string {
    const longest = Math.max(this.plans().minimum.balances.length, balances.length, 2) - 1;
    const max = Math.max(...this.plans().minimum.balances, ...balances, 1);
    return balances
      .map((balance, month) => {
        const x = (month / longest) * CHART_WIDTH;
        const y = CHART_HEIGHT - (balance / max) * CHART_HEIGHT;
        return `${month === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }
}
