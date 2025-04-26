import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'test-modals',
    loadComponent: () =>
      import('./pages/modals-page/modals-page.component').then((c) => c.ModalsPageComponent),
  },
  {
    path: 'game',
    loadComponent: () =>
      import('./pages/modals-page/modals-page.component').then((c) => c.ModalsPageComponent),
  },
];
