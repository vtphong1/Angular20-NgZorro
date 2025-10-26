import {Routes} from '@angular/router';

export const CATEGORY_ROUTES: Routes = [
  {
    path: 'document',
    loadComponent: () => import('./document/document').then(m => m.Document),
  }
]
