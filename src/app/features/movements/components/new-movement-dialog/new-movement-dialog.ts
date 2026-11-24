import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { UiService } from '../../../../core/services/ui.service';
import { Dialog } from '../../../../shared/components/dialog/dialog';
import { Icon } from '../../../../shared/components/icon/icon';
import { AccountsService } from '../../../../core/services/accounts.service';
import { MovementsService } from '../../../../core/services/movements.service';
import { MovementType } from '../../../../core/models/movement.model';

function todayInputValue(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

@Component({
  selector: 'fa-new-movement-dialog',
  imports: [FormsModule, TranslatePipe, Dialog, Icon],
  templateUrl: './new-movement-dialog.html',
  styleUrl: './new-movement-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMovementDialog {
  private readonly ui = inject(UiService);
  private readonly accounts = inject(AccountsService);
  protected readonly movements = inject(MovementsService);

  protected readonly type = signal<MovementType>('expense');
  protected readonly amount = signal<number | null>(null);
  protected readonly description = signal('');
  protected readonly categoryId = signal('groceries');
  protected readonly accountId = signal('cash');
  protected readonly date = signal(todayInputValue());
  protected readonly showError = signal(false);

  protected readonly accountOptions = computed(() =>
    this.accounts.accounts().filter((account) => account.sync !== 'inactive'),
  );

  protected setType(type: MovementType): void {
    this.type.set(type);
    this.categoryId.set(type === 'income' ? 'income' : 'groceries');
  }

  protected save(): void {
    const amount = Number(this.amount());
    if (!amount || amount <= 0) {
      this.showError.set(true);
      return;
    }
    const now = new Date();
    const [year, month, day] = this.date().split('-').map(Number);
    const date = new Date(year, month - 1, day, now.getHours(), now.getMinutes());
    const category = this.movements.category(this.categoryId());

    this.movements.add({
      type: this.type(),
      amount,
      description: this.description().trim() || category.name,
      accountId: this.accountId(),
      categoryId: this.categoryId(),
      date: date.toISOString(),
    });
    this.ui.close();
    this.ui.notify('movements.saved');
  }
}
