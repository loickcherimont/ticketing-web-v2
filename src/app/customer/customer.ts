import { Component, inject } from '@angular/core';
import { LoginService } from '../login-form/login-service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customer',
  imports: [MatButtonModule],
  templateUrl: './customer.html',
  styleUrl: './customer.scss'
})
export class Customer {
  private loginService = inject(LoginService);

  logout() {
    this.loginService.logout();
  }
}
