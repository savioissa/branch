import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'filial' },
  {
    path: 'filial',
    loadComponent: () =>
      import('./branch/branch-list/branch-list.component').then((m) => m.BranchListComponent)
  },
  {
    path: 'filial/nova',
    loadComponent: () =>
      import('./branch/branch-form/branch-form.component').then((m) => m.BranchFormComponent)
  },
  {
    // depois de 'filial/nova', para "nova" não ser lida como código
    path: 'filial/:codigo',
    loadComponent: () =>
      import('./branch/branch-detail/branch-detail.component').then((m) => m.BranchDetailComponent)
  }
];
