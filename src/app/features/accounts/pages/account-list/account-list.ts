import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { UiService } from '../../../../core/services/ui.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency.pipe';
import { MovementsService } from '../../../../core/services/movements.service';
import { AccountsService } from '../../../../core/services/accounts.service';

@Component({
  selector: 'fa-account-list',
  imports: [RouterLink, TranslatePipe, Icon, PageHeader, CopCurrencyPipe],
  templateUrl: './account-list.html',
  styleUrl: './account-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountList {
  protected readonly ui = inject(UiService);
  protected readonly accounts = inject(AccountsService);
  private readonly movements = inject(MovementsService);

  protected readonly autoCount = computed(
    () => this.accounts.accounts().filter((account) => account.sync === 'auto').length,
  );

  protected readonly creditDebt = computed(() =>
    this.accounts
      .accounts()
      .filter((account) => account.kind === 'credit')
      .reduce((total, account) => total + Math.abs(account.balance ?? 0), 0),
  );

  protected movementsCount(accountId: string): number {
    return this.movements.thisMonth().filter((movement) => movement.accountId === accountId).length;
  }

  protected activate(accountId: string): void {
    this.accounts.activate(accountId);
    this.ui.notify('accounts.activated');
  }
}
