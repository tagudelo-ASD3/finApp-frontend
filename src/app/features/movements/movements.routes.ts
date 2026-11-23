import { Routes } from '@angular/router';

export const MOVEMENTS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/movement-list/movement-list').then((m) => m.MovementList) },
  { path: ':id', loadComponent: () => import('./pages/movement-detail/movement-detail').then((m) => m.MovementDetail) },
];
