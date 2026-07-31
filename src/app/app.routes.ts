import { Routes } from '@angular/router';
import { Agent } from './agent/agent';
import { Customer } from './customer/customer';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
	{ path: 'agent', component: Agent },
	{ path: 'customer', component: Customer },
  	{ path: '**', component: NotFound }
];
