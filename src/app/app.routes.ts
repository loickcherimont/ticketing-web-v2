import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { NotFound } from './not-found/not-found';
import { LoginForm } from './login-form/login-form';
import { authGuard } from './auth/auth-guard';
import { AuthService } from './auth/auth.service';
import { guestOnlyGuard } from './guest-only-guard';
import { TicketNew } from './tickets/ticket-new/ticket-new';
import { TicketsList } from './tickets/tickets-list/tickets-list';
import { TicketDetail } from './tickets/ticket-detail/ticket-detail';

export const routes: Routes = [
  { path: '', redirectTo: () => inject(AuthService).homePath(), pathMatch: 'full' },
  { path: 'tickets', component: TicketsList, canActivate: [authGuard] },
  { path: 'tickets/new', component: TicketNew, canActivate: [authGuard] },
  { path: 'tickets/:id', component: TicketDetail, canActivate: [authGuard] },
  { path: 'login', component: LoginForm, canActivate: [guestOnlyGuard] },
  { path: '**', component: NotFound }
];
