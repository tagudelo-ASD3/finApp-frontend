export type AccountKind = 'cash' | 'wallet' | 'bank' | 'credit';

/** auto = balance updated from notifications, manual = typed by the user, inactive = not connected yet. */
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

/** Phone platform shown in the "Conectar avisos" guide. */
export type AlertPlatform = 'android' | 'iphone';
