import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { UiService } from '../../../../core/services/ui.service';
import { Dialog } from '../../../../shared/components/dialog/dialog';
import { DebtsService } from '../../../../core/services/debts.service';

@Component({
  selector: 'fa-register-debt-dialog',
  imports: [FormsModule, TranslatePipe, Dialog],
  templateUrl: './register-debt-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterDebtDialog {
  private readonly ui = inject(UiService);
  private readonly debts = inject(DebtsService);

  protected readonly name = signal('');
  protected readonly lender = signal('');
  protected readonly balance = signal<number | null>(null);
  protected readonly monthlyRate = signal<number | null>(null);
  protected readonly installment = signal<number | null>(null);
  protected readonly dueDay = signal<number | null>(null);
  protected readonly showError = signal(false);

  protected save(): void {
    const balance = Number(this.balance());
    const installment = Number(this.installment());
    const dueDay = Number(this.dueDay());
    if (!this.name().trim() || balance <= 0 || installment <= 0 || dueDay < 1 || dueDay > 31) {
      this.showError.set(true);
      return;
    }
    this.debts.add({
      name: this.name().trim(),
      lender: this.lender().trim() || 'Registro manual',
      balance,
      monthlyRate: Math.max(Number(this.monthlyRate()) || 0, 0),
      installment,
      dueDay,
      cutoffDay: null,
    });
    this.ui.close();
    this.ui.notify('debts.saved');
  }
}
