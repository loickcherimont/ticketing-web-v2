import { Routes } from '@angular/router';
import { Agent } from './agent/agent';
import { Customer } from './customer/customer';
import { NotFound } from './not-found/not-found';
import { LoginForm } from './login-form/login-form';
import { authGuard, roleGuard } from './auth/auth-guard';
import { Forbidden } from './forbidden/forbidden';

export const routes: Routes = [
  { path: 'agent', component: Agent, canActivate: [authGuard, roleGuard('AGENT')]},
  { path: 'customer', component: Customer, canActivate: [authGuard, roleGuard('USER')]},
  { path: 'login', component: LoginForm },
  { path: 'forbidden', component: Forbidden },
  { path: '**', component: NotFound }
];
