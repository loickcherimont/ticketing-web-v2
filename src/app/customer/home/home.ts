import { Component, inject } from '@angular/core';
import { LoginService } from '../../login-form/login-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
})
export class Home {
  private loginService = inject(LoginService);

  logout() {
    this.loginService.logout();
  }
}
