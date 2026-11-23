import { Routes } from '@angular/router';

export const DEBTS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/debt-list/debt-list').then((m) => m.DebtList) },
  { path: 'plan', loadComponent: () => import('./pages/payment-plan/payment-plan').then((m) => m.PaymentPlanPage) },
  { path: ':id', loadComponent: () => import('./pages/debt-detail/debt-detail').then((m) => m.DebtDetail) },
];
