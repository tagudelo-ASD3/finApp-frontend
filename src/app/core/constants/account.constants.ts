import { AccountKind } from '../models/account.model';

export const ACCOUNT_KIND_DESCRIPTIONS: Record<AccountKind, string> = {
  bank: 'Cuenta de ahorros',
  wallet: 'Billetera digital',
  cash: 'Registro manual',
  credit: 'Tarjeta de crédito',
};
