import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { LoginService } from '../login-form/login-service';

@Component({
  selector: 'app-forbidden',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './forbidden.html',
  styleUrl: './forbidden.scss',
})
export class Forbidden {
  private loginService = inject(LoginService);

  pathUrl = computed(() => {
    if (this.loginService.role() === 'AGENT') {
      return '/agent';
    }
    return '/customer';
  })
}
