import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';
import { Shell } from './core/layout/shell/shell';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/pages/login/login').then((m) => m.Login),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/pages/about/about').then((m) => m.About),
  },
  {
    path: '',
    component: Shell,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'movements',
        loadChildren: () =>
          import('./features/movements/movements.routes').then((m) => m.MOVEMENTS_ROUTES),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./features/accounts/accounts.routes').then((m) => m.ACCOUNTS_ROUTES),
      },
      {
        path: 'budgets',
        loadComponent: () =>
          import('./features/budgets/pages/budget-overview/budget-overview').then((m) => m.BudgetOverview),
      },
      {
        path: 'debts',
        loadChildren: () => import('./features/debts/debts.routes').then((m) => m.DEBTS_ROUTES),
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./features/debts/pages/payment-calendar/payment-calendar').then((m) => m.PaymentCalendar),
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/pages/reports/reports').then((m) => m.Reports),
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/pages/profile/profile').then((m) => m.Profile),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
