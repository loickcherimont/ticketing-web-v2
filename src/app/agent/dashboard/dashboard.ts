import { Component, inject } from '@angular/core';
import { LoginService } from '../../login-form/login-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private loginService = inject(LoginService);

  logout() {
    this.loginService.logout();
  }
}
