import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-tickets-list',
  imports: [RouterLink],
  templateUrl: './tickets-list.html',
})
export class TicketsList implements OnInit {

  private ticketService = inject(TicketService);
  private authService = inject(AuthService);
  private router = inject(Router);

  /** Tickets currently displayed, loaded from `GET /api/tickets`. */
  tickets = signal<Ticket[]>([]);

  /** Error message shown when an API call fails. */
  errorMessage = signal<string | null>(null);

  /** Ticket targeted by the "solve" modal, `null` when the modal is closed. */
  solveTarget = signal<Ticket | null>(null);

  solution = signal('');

  isAgent = computed(() => this.authService.role() === 'AGENT');

  ngOnInit() {
    this.loadTickets();
  }

  /** Fetches the ticket list via `GET /api/tickets`. */
  loadTickets() {
    this.ticketService.getTickets().subscribe({
      next: (tickets) => {
        this.tickets.set(tickets);
        this.errorMessage.set(null);
      },
      error: () => this.errorMessage.set('Impossible de charger les tickets.'),
    });
  }

  /** Marks a ticket as `IN_PROGRESS` (agent only), then reloads the list. */
  setInProgress(ticket: Ticket) {
    this.ticketService.setInProgress(ticket.id).subscribe({
      next: () => this.loadTickets(),
      error: () => this.errorMessage.set('Impossible de mettre le ticket en cours.'),
    });
  }

  /** Opens the "solve" modal for the given ticket. */
  openSolveModal(ticket: Ticket) {
    this.solveTarget.set(ticket);
    this.solution.set('');
  }

  /** Closes the "solve" modal without solving. */
  closeSolveModal() {
    this.solveTarget.set(null);
  }

  /** Reads the solution text typed in the modal. */
  onSolutionInput(event: Event) {
    this.solution.set((event.target as HTMLTextAreaElement).value);
  }

  /** Sends the solution via `PATCH /api/tickets/{id}/solve`, then reloads. */
  submitSolution() {
    const ticket = this.solveTarget();
    if (ticket === null || this.solution().trim() === '') {
      return;
    }
    this.ticketService.solve(ticket.id, this.solution()).subscribe({
      next: () => {
        this.closeSolveModal();
        this.loadTickets();
      },
      error: () => this.errorMessage.set('Impossible de résoudre le ticket.'),
    });
  }

  /** Navigates to the ticket creation form. */
  newTicket() {
    this.router.navigate(['/tickets/new']);
  }

  /** Logs the user out (clears session and redirects to `/login`). */
  logout() {
    this.authService.logout();
  }

  /** Bootstrap badge color for a given status. */
  statusBadge(status: Ticket['status']): string {
    switch (status) {
      case 'OPEN':
        return 'text-bg-info';
      case 'IN_PROGRESS':
        return 'text-bg-primary';
      case 'CLOSED':
        return 'text-bg-success';
    }
  }

  /** French label for a given status. */
  statusLabel(status: Ticket['status']): string {
    switch (status) {
      case 'OPEN':
        return 'Ouvert';
      case 'IN_PROGRESS':
        return 'En cours';
      case 'CLOSED':
        return 'Résolu';
    }
  }
}
