import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { UiService } from '../../../../core/services/ui.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency.pipe';
import { RelativeDatePipe } from '../../../../shared/pipes/relative-date.pipe';
import { AccountsService } from '../../../../core/services/accounts.service';
import { MovementsService, signedAmount } from '../../../../core/services/movements.service';
import { MovementDayGroup, MovementTypeFilter } from '../../../../core/models/movement.model';

@Component({
  selector: 'fa-movement-list',
  imports: [DatePipe, RouterLink, TranslatePipe, Icon, PageHeader, CopCurrencyPipe, RelativeDatePipe],
  templateUrl: './movement-list.html',
  styleUrl: './movement-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovementList {
  protected readonly ui = inject(UiService);
  protected readonly movements = inject(MovementsService);
  protected readonly accounts = inject(AccountsService);

  readonly q = input<string | undefined>();

  protected readonly query = linkedSignal(() => this.q() ?? '');
  protected readonly type = signal<MovementTypeFilter>('all');
  protected readonly accountId = signal('all');
  protected readonly categoryId = signal('all');
  protected readonly signedAmount = signedAmount;

  protected readonly filtered = computed(() => {
    const text = this.query().trim().toLowerCase();
    return this.movements.all().filter(
      (movement) =>
        (this.type() === 'all' || movement.type === this.type()) &&
        (this.accountId() === 'all' || movement.accountId === this.accountId()) &&
        (this.categoryId() === 'all' || movement.categoryId === this.categoryId()) &&
        (!text ||
          movement.description.toLowerCase().includes(text) ||
          this.movements.category(movement.categoryId).name.toLowerCase().includes(text)),
    );
  });

  protected readonly groups = computed<MovementDayGroup[]>(() => {
    const groups = new Map<string, MovementDayGroup>();
    for (const movement of this.filtered()) {
      const key = movement.date.slice(0, 10);
      const group = groups.get(key) ?? { date: movement.date, total: 0, items: [] };
      group.items.push(movement);
      group.total += signedAmount(movement);
      groups.set(key, group);
    }
    return [...groups.values()];
  });

  protected readonly filteredIncome = computed(() =>
    this.filtered().filter((m) => m.type === 'income').reduce((total, m) => total + m.amount, 0),
  );

  protected readonly filteredExpense = computed(() =>
    this.filtered().filter((m) => m.type === 'expense').reduce((total, m) => total + m.amount, 0),
  );

  protected clearFilters(): void {
    this.query.set('');
    this.type.set('all');
    this.accountId.set('all');
    this.categoryId.set('all');
  }
}
