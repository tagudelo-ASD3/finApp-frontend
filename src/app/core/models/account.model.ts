export type AccountKind = 'cash' | 'wallet' | 'bank' | 'credit';

export type AccountSync = 'auto' | 'manual' | 'inactive';

export interface Account {
  id: string;
  name: string;
  kind: AccountKind;
  description: string;
  initials: string;
  balance: number | null;
  sync: AccountSync;
}

export interface AlertApp {
  id: string;
  name: string;
  initials: string;
  enabled: boolean;
}

export type AlertPlatform = 'android' | 'iphone';

export type NewAccount = Omit<Account, 'id' | 'initials'>;
