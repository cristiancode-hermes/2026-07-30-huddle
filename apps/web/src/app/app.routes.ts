import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LayoutShell } from './layout/layout-shell/layout-shell';

export const routes: Routes = [
  {
    path: '',
    component: LayoutShell,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardPage),
        title: 'Dashboard — Huddle'
      },
      {
        path: 'groups',
        loadComponent: () => import('./pages/group-list/group-list').then(m => m.GroupListPage),
        title: 'Groups — Huddle'
      },
      {
        path: 'groups/new',
        loadComponent: () => import('./pages/group-create/group-create').then(m => m.GroupCreatePage),
        title: 'Create Group — Huddle'
      },
      {
        path: 'groups/:groupId',
        loadComponent: () => import('./pages/group-detail/group-detail').then(m => m.GroupDetailPage),
        title: 'Group — Huddle'
      },
      {
        path: 'groups/:groupId/settings',
        loadComponent: () => import('./pages/group-settings/group-settings').then(m => m.GroupSettingsPage),
        title: 'Group Settings — Huddle'
      },
      {
        path: 'hangouts/:hangoutId',
        loadComponent: () => import('./pages/hangout-detail/hangout-detail').then(m => m.HangoutDetailPage),
        title: 'Hangout — Huddle'
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then(m => m.ProfilePage),
        title: 'Profile — Huddle'
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginPage),
    title: 'Login — Huddle'
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.RegisterPage),
    title: 'Register — Huddle'
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
