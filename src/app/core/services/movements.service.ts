import { Injectable, computed, inject } from '@angular/core';
import { persistedSignal } from '../utils/persisted-signal';
import { isSameDay, isSameMonth } from '../utils/date.utils';
import { CATEGORIES_MOCK } from '../../../mocks/categories.mock';
import { MOVEMENTS_MOCK } from '../../../mocks/movements.mock';
import { AccountsService } from './accounts.service';
import { Category, Movement, NewMovement } from '../models/movement.model';

export function signedAmount(movement: Movement): number {
  return movement.type === 'income' ? movement.amount : -movement.amount;
}

function sumAmounts(movements: Movement[]): number {
  return movements.reduce((total, movement) => total + movement.amount, 0);
}

@Injectable({ providedIn: 'root' })
export class MovementsService {
  private readonly accounts = inject(AccountsService);
  private readonly store = persistedSignal<Movement[]>('movements', MOVEMENTS_MOCK);

  readonly categories: readonly Category[] = CATEGORIES_MOCK;
  readonly expenseCategories = CATEGORIES_MOCK.filter((category) => category.type === 'expense');

  readonly all = computed(() => [...this.store()].sort((a, b) => b.date.localeCompare(a.date)));

  readonly thisMonth = computed(() => {
    const now = new Date();
    return this.all().filter((movement) => isSameMonth(new Date(movement.date), now));
  });

  readonly monthIncome = computed(() =>
    sumAmounts(this.thisMonth().filter((movement) => movement.type === 'income')),
  );

  readonly monthExpense = computed(() =>
    sumAmounts(this.thisMonth().filter((movement) => movement.type === 'expense')),
  );

  readonly monthBalance = computed(() => this.monthIncome() - this.monthExpense());

  readonly autoRegisteredToday = computed(() => {
    const now = new Date();
    return this.all().filter(
      (movement) => movement.source === 'auto' && isSameDay(new Date(movement.date), now),
    ).length;
  });

  byId(id: string): Movement | undefined {
    return this.store().find((movement) => movement.id === id);
  }

  category(id: string): Category {
    return this.categories.find((category) => category.id === id) ?? this.categories[0];
  }

  add(input: NewMovement): Movement {
    const movement: Movement = { ...input, id: crypto.randomUUID(), source: 'manual' };
    this.store.update((movements) => [movement, ...movements]);
    this.accounts.applyMovement(movement.accountId, signedAmount(movement));
    return movement;
  }

  remove(id: string): void {
    const movement = this.byId(id);
    if (!movement) {
      return;
    }
    this.store.update((movements) => movements.filter((item) => item.id !== id));
    this.accounts.applyMovement(movement.accountId, -signedAmount(movement));
  }

  changeCategory(id: string, categoryId: string): void {
    this.store.update((movements) =>
      movements.map((movement) => (movement.id === id ? { ...movement, categoryId } : movement)),
    );
  }
}
