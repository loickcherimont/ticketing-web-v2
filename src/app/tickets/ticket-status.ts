import { Ticket } from './ticket.model';

/**
 * Display metadata for each ticket status.
 * `class` is the Bootstrap `text-bg-*` utility (background + readable text):
 * blue = OPEN, yellow = IN_PROGRESS, green = CLOSED.
 */
export const TICKET_STATUS: Record<Ticket['status'], { label: string; class: string }> = {
  OPEN: { label: 'Ouvert', class: 'text-bg-primary' },
  IN_PROGRESS: { label: 'En cours', class: 'text-bg-warning' },
  CLOSED: { label: 'Résolu', class: 'text-bg-success' },
};

/** French label for a given status. */
export function statusLabel(status: Ticket['status']): string {
  return TICKET_STATUS[status].label;
}

/** Bootstrap `text-bg-*` class for a given status. */
export function statusClass(status: Ticket['status']): string {
  return TICKET_STATUS[status].class;
}
