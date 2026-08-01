import { Component, inject } from '@angular/core';
import { LoginService } from '../login-form/login-service';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
})
export class Customer {
  private loginService = inject(LoginService);

  logout() {
    this.loginService.logout();
  }
}
