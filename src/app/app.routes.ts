import { Routes } from '@angular/router';
import { Agent } from './agent/agent';
import { Customer } from './customer/customer';
import { NotFound } from './not-found/not-found';
import { LoginForm } from './login-form/login-form';
import { authGuard, roleGuard } from './auth/auth-guard';
import { Forbidden } from './forbidden/forbidden';
import { inject } from '@angular/core';
import { LoginService } from './login-form/login-service';
import { guestOnlyGuard } from './guest-only-guard';

export const routes: Routes = [
  { path: '', redirectTo: () => inject(LoginService).homePath(), pathMatch: 'full' },
  { path: 'agent', component: Agent, canActivate: [authGuard, roleGuard('AGENT')] },
  { path: 'customer', component: Customer, canActivate: [authGuard, roleGuard('USER')] },
  { path: 'login', component: LoginForm, canActivate: [guestOnlyGuard] },
  { path: 'forbidden', component: Forbidden },
  { path: '**', component: NotFound }
];
