import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket.model';
import { statusClass as ticketStatusClass, statusLabel as ticketStatusLabel } from '../ticket-status';

@Component({
  selector: 'app-ticket-detail',
  imports: [],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.scss',
})
export class TicketDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ticketService = inject(TicketService);

  /** Ticket currently displayed, loaded from `GET /api/tickets/{id}`. */
  ticket = signal<Ticket | null>(null);

  /** Error message shown when the API call fails. */
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      this.errorMessage.set('Identifiant de ticket invalide.');
      return;
    }
    this.ticketService.getTicket(id).subscribe({
      next: (ticket) => {
        this.ticket.set(ticket);
        this.errorMessage.set(null);
      },
      error: () => this.errorMessage.set('Impossible de charger le ticket.'),
    });
  }

  /** Navigates back to the ticket list. */
  goBack() {
    this.router.navigate(['/tickets']);
  }

  /** Bootstrap `text-bg-*` class for a given status. */
  statusClass(status: Ticket['status']): string {
    return ticketStatusClass(status);
  }

  /** French label for a given status. */
  statusLabel(status: Ticket['status']): string {
    return ticketStatusLabel(status);
  }
}