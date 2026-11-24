import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { UiService } from '../../../../core/services/ui.service';
import { Dialog } from '../../../../shared/components/dialog/dialog';
import { AccountsService } from '../../../../core/services/accounts.service';
import { AccountKind } from '../../../../core/models/account.model';
import { ACCOUNT_KIND_DESCRIPTIONS } from '../../../../core/constants/account.constants';

@Component({
  selector: 'fa-new-account-dialog',
  imports: [FormsModule, TranslatePipe, Dialog],
  templateUrl: './new-account-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAccountDialog {
  private readonly ui = inject(UiService);
  private readonly accounts = inject(AccountsService);

  protected readonly kinds: AccountKind[] = ['bank', 'wallet', 'cash', 'credit'];
  protected readonly kind = signal<AccountKind>('bank');
  protected readonly name = signal('');
  protected readonly balance = signal<number | null>(null);
  protected readonly auto = signal(true);
  protected readonly showError = signal(false);

  protected save(): void {
    const name = this.name().trim();
    if (!name) {
      this.showError.set(true);
      return;
    }
    const amount = Math.abs(Number(this.balance()) || 0);
    const kind = this.kind();
    this.accounts.add({
      name,
      kind,
      description: ACCOUNT_KIND_DESCRIPTIONS[kind],
      balance: kind === 'credit' ? -amount : amount,
      sync: kind === 'cash' || !this.auto() ? 'manual' : 'auto',
    });
    this.ui.close();
    this.ui.notify('accounts.saved');
  }
}
