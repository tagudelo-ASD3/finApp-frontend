import { Account, AlertApp } from '../app/core/models/account.model';

export const ACCOUNTS_MOCK: Account[] = [
  { id: 'cash', name: 'Efectivo', kind: 'cash', description: 'Registro manual', initials: 'EF', balance: 180000, sync: 'manual' },
  { id: 'nequi', name: 'Nequi', kind: 'wallet', description: 'Cuenta de ahorro', initials: 'NQ', balance: 420500, sync: 'auto' },
  { id: 'bancolombia', name: 'Bancolombia', kind: 'bank', description: 'Cuenta de ahorros', initials: 'BC', balance: 1850000, sync: 'auto' },
  { id: 'daviplata', name: 'Daviplata', kind: 'wallet', description: 'Billetera digital', initials: 'DP', balance: 95000, sync: 'auto' },
  { id: 'visa', name: 'Tarjeta Visa', kind: 'credit', description: 'Crédito Bancolombia', initials: 'VS', balance: -2150000, sync: 'auto' },
  { id: 'nu', name: 'Nu', kind: 'wallet', description: 'Cuenta de ahorro', initials: 'NU', balance: null, sync: 'inactive' },
];

export const ALERT_APPS_MOCK: AlertApp[] = [
  { id: 'bancolombia', name: 'Bancolombia', initials: 'BC', enabled: true },
  { id: 'davivienda', name: 'Davivienda', initials: 'DV', enabled: false },
  { id: 'bbva', name: 'BBVA', initials: 'BB', enabled: false },
  { id: 'bogota', name: 'Banco de Bogotá', initials: 'BO', enabled: false },
  { id: 'nequi', name: 'Nequi', initials: 'NQ', enabled: true },
  { id: 'daviplata', name: 'Daviplata', initials: 'DP', enabled: true },
  { id: 'nu', name: 'Nu', initials: 'NU', enabled: false },
  { id: 'avvillas', name: 'AV Villas', initials: 'AV', enabled: false },
];
