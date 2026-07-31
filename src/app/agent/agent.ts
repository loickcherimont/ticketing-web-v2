import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../login-form/login-service';

@Component({
  selector: 'app-agent',
  imports: [MatButtonModule],
  templateUrl: './agent.html',
  styleUrl: './agent.scss'
})
export class Agent {

  private loginService = inject(LoginService);

  logout() {
    this.loginService.logout();
  }
}
