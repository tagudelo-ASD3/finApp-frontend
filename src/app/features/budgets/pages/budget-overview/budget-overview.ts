import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { UiService } from '../../../../core/services/ui.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency.pipe';
import { BudgetsService } from '../../../../core/services/budgets.service';

@Component({
  selector: 'fa-budget-overview',
  imports: [DatePipe, TranslatePipe, Icon, PageHeader, CopCurrencyPipe],
  templateUrl: './budget-overview.html',
  styleUrl: './budget-overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetOverview {
  protected readonly ui = inject(UiService);
  protected readonly budgets = inject(BudgetsService);
  protected readonly today = new Date();

  protected readonly weeklyMax = computed(() => Math.max(...this.budgets.weekly().map((week) => week.amount), 1));
  protected readonly currentWeek = computed(() => Math.min(Math.floor((this.today.getDate() - 1) / 7), 3));

  /** Ring chart: circumference of a circle with r = 52. */
  protected readonly ringLength = 2 * Math.PI * 52;
  protected readonly ringOffset = computed(
    () => this.ringLength * (1 - Math.min(this.budgets.percentUsed(), 100) / 100),
  );
}
