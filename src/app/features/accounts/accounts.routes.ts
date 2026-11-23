import { Routes } from '@angular/router';

export const ACCOUNTS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/account-list/account-list').then((m) => m.AccountList) },
  { path: 'auto-register', loadComponent: () => import('./pages/auto-register/auto-register').then((m) => m.AutoRegister) },
];
