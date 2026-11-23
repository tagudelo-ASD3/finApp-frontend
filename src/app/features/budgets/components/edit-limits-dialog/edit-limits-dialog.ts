import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UiService } from '../../../../core/services/ui.service';
import { Dialog } from '../../../../shared/components/dialog/dialog';
import { Icon } from '../../../../shared/components/icon/icon';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency.pipe';
import { MovementsService } from '../../../../core/services/movements.service';
import { BudgetsService } from '../../../../core/services/budgets.service';

@Component({
  selector: 'fa-edit-limits-dialog',
  imports: [TranslatePipe, Dialog, Icon, CopCurrencyPipe],
  templateUrl: './edit-limits-dialog.html',
  styleUrl: './edit-limits-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditLimitsDialog {
  private readonly ui = inject(UiService);
  private readonly budgets = inject(BudgetsService);
  protected readonly movements = inject(MovementsService);

  protected readonly draft = signal(this.budgets.limits().map((limit) => ({ ...limit })));
  protected readonly total = computed(() => this.draft().reduce((sum, limit) => sum + limit.limit, 0));

  protected setLimit(index: number, value: number): void {
    this.draft.update((limits) =>
      limits.map((limit, i) => (i === index ? { ...limit, limit: Number.isFinite(value) ? Math.max(value, 0) : 0 } : limit)),
    );
  }

  protected save(): void {
    this.budgets.updateLimits(this.draft());
    this.ui.close();
    this.ui.notify('budgets.saved');
  }
}
