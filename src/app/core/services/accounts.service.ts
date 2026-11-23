import { Injectable, computed } from '@angular/core';
import { persistedSignal } from '../utils/persisted-signal';
import { ACCOUNTS_MOCK, ALERT_APPS_MOCK } from '../../../mocks/accounts.mock';
import { Account } from '../models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  readonly accounts = persistedSignal<Account[]>('accounts', ACCOUNTS_MOCK);
  readonly alertApps = persistedSignal('alert-apps', ALERT_APPS_MOCK);

  /** Accounts that hold the user's own money (credit cards are debts, not balance). */
  readonly moneyAccounts = computed(() =>
    this.accounts().filter((account) => account.kind !== 'credit' && account.balance !== null),
  );

  readonly totalAvailable = computed(() =>
    this.moneyAccounts().reduce((total, account) => total + (account.balance ?? 0), 0),
  );

  readonly enabledAlertApps = computed(() => this.alertApps().filter((app) => app.enabled));

  byId(id: string): Account | undefined {
    return this.accounts().find((account) => account.id === id);
  }

  /** Adds a signed amount to the account balance (income positive, expense negative). */
  applyMovement(accountId: string, signedAmount: number): void {
    this.accounts.update((accounts) =>
      accounts.map((account) =>
        account.id === accountId && account.balance !== null
          ? { ...account, balance: account.balance + signedAmount }
          : account,
      ),
    );
  }

  add(account: Omit<Account, 'id' | 'initials'>): void {
    const initials = account.name.trim().slice(0, 2).toUpperCase();
    this.accounts.update((accounts) => [...accounts, { ...account, id: crypto.randomUUID(), initials }]);
  }

  activate(accountId: string): void {
    this.accounts.update((accounts) =>
      accounts.map((account) =>
        account.id === accountId ? { ...account, sync: 'auto', balance: account.balance ?? 0 } : account,
      ),
    );
  }

  toggleAlertApp(appId: string): void {
    this.alertApps.update((apps) =>
      apps.map((app) => (app.id === appId ? { ...app, enabled: !app.enabled } : app)),
    );
  }
}
