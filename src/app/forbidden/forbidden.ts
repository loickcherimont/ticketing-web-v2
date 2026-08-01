import { Component, computed, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LoginService } from '../login-form/login-service';

@Component({
  selector: 'app-forbidden',
  imports: [RouterLink],
  templateUrl: './forbidden.html',
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
