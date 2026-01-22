import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register').then(m => m.RegisterComponent),
  },
  {
    path: 'tasks/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/tasks/pages/task-form/task-form').then(m => m.TaskFormComponent),
  },
  {
    path: 'tasks/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/tasks/pages/task-detail/task-detail').then(m => m.TaskDetail),
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/tasks/pages/task-list/task-list').then(m => m.TaskListComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'users',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/admin/pages/users-list/users-list.component').then(m => m.UsersListComponent),
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
];
