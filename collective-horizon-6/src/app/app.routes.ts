import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/garage/garage.component').then((m) => m.GarageComponent),
  },
];