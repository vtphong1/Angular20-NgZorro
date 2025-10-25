import { Routes } from '@angular/router';
import {Layout} from '@shared/layout/layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login').then(m => m.Login),
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard').then(m => m.Dashboard),
        data: {
          title: 'Dashboard',
          authorities: ['ADMIN']
        }
      },
      {
        path: 'manager',
        loadComponent: () => import('./modules/manager/manager').then(m => m.Manager),
        data: {
          title: 'Manager',
        }
      }
    ]
  }
];
