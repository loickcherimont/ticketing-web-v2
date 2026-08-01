import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { LoginForm } from './login-form/login-form';
import { authGuard, roleGuard } from './auth/auth-guard';
import { Forbidden } from './forbidden/forbidden';
import { inject } from '@angular/core';
import { LoginService } from './login-form/login-service';
import { guestOnlyGuard } from './guest-only-guard';
import { Dashboard } from './agent/dashboard/dashboard';
import { Home } from './customer/home/home';

export const routes: Routes = [
  { path: '', redirectTo: () => inject(LoginService).homePath(), pathMatch: 'full' },
  { path: 'agent', pathMatch: 'full', redirectTo: '/agent/dashboard' },
  { path: 'customer', pathMatch: 'full', redirectTo: '/customer/home' },
  { path: 'agent/dashboard', component: Dashboard, canActivate: [authGuard, roleGuard('AGENT')] },
  { path: 'customer/home', component: Home, canActivate: [authGuard, roleGuard('USER')] },
  { path: 'login', component: LoginForm, canActivate: [guestOnlyGuard] },
  { path: 'forbidden', component: Forbidden },
  { path: '**', component: NotFound }
];
