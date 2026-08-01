import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { TicketService } from '../ticket.service';
import { CreateTicketInput } from '../ticket.model';

@Component({
  selector: 'app-ticket-new',
  imports: [FormField, FormRoot],
  templateUrl: './ticket-new.html',
})
export class TicketNew {

  private ticketService = inject(TicketService);
  private authService = inject(AuthService);
  private router = inject(Router);

  /** Form values sent to `POST /api/tickets`. */
  ticketInput = signal<CreateTicketInput>({
    title: '',
    description: ''
  });

  ticketForm = form(this.ticketInput, (schemaPath) => {
    required(schemaPath.title, { message: 'Le titre est requis' });
    required(schemaPath.description, { message: 'La description est requise' });
  }, {
    submission: {
      action: async (field) => {
        try {
          await firstValueFrom(this.ticketService.createTicket(field().value()));
          this.router.navigate(['/tickets']);
          return undefined;
        } catch {
          return {
            kind: 'create-failed',
            message: 'Impossible de créer le ticket. Vérifiez que l\'API est accessible.'
          };
        }
      }
    }
  });

  /** Navigates back to the user workspace (the ticket list). */
  goBack() {
    this.router.navigate([this.authService.homePath()]);
  }
}
