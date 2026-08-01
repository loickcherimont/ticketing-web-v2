import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateTicketInput, Ticket } from './ticket.model';

/**
 * Handles the ticket API calls (`/api/tickets`).
 *
 * Faithful to the backend `TicketController`:
 * - GET   /api/tickets                     -> list all tickets
 * - POST  /api/tickets                     -> create a ticket
 * - PATCH /api/tickets/{id}/in-progress    -> mark as IN_PROGRESS (agent only)
 * - PATCH /api/tickets/{id}/solve          -> mark as CLOSED with a solution (agent only)
 */
@Service()
export class TicketService {

  private readonly BASE_URL = `${environment.apiUrl}/tickets`;

  private http = inject(HttpClient);

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.BASE_URL);
  }

  /** Fetches a single ticket via `GET /api/tickets/{id}`. */
  getTicket(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.BASE_URL}/${id}`);
  }

  createTicket(input: CreateTicketInput): Observable<Ticket> {
    return this.http.post<Ticket>(this.BASE_URL, input);
  }

  /**
   * Marks a ticket as `IN_PROGRESS` via `PATCH /api/tickets/{id}/in-progress`.
   * Requires the `AGENT` role.
   */
  setInProgress(id: string): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.BASE_URL}/${id}/in-progress`, null);
  }

  /**
   * Solves a ticket via `PATCH /api/tickets/{id}/solve`.
   * Requires the `AGENT` role and a non-empty solution text.
   */
  solve(id: string, solution: string): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.BASE_URL}/${id}/solve`, { solution });
  }
}
