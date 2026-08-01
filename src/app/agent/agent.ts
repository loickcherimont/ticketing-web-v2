import { Component, inject } from '@angular/core';
import { LoginService } from '../login-form/login-service';

@Component({
  selector: 'app-agent',
  imports: [],
  templateUrl: './agent.html',
})
export class Agent {

  private loginService = inject(LoginService);

  logout() {
    this.loginService.logout();
  }
}
