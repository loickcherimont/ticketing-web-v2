import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TicketService } from './ticket.service';
import { CreateTicketInput, Ticket } from './ticket.model';
import { environment } from '../../environments/environment';

describe('TicketService', () => {
  const baseUrl = `${environment.apiUrl}/tickets`;

  let service: TicketService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(TicketService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should fetch all tickets with GET', () => {
    const expectedTickets: Ticket[] = [
      {
        id: 'ticket-1',
        title: 'Bug login',
        description: 'Impossible de se connecter',
        status: 'OPEN',
        solution: null,
      },
      {
        id: 'ticket-2',
        title: 'Bug paiement',
        description: 'Erreur 500 au paiement',
        status: 'CLOSED',
        solution: 'Redis corrigé',
      },
    ];
    let received: Ticket[] | undefined;

    service.getTickets().subscribe((tickets) => {
      received = tickets;
    });

    const req = httpTesting.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(expectedTickets);

    expect(received).toEqual(expectedTickets);
  });

  it('should fetch a single ticket by id with GET', () => {
    const expectedTicket: Ticket = {
      id: 'ticket-1',
      title: 'Bug login',
      description: 'Impossible de se connecter',
      status: 'OPEN',
      solution: null,
    };
    let received: Ticket | undefined;

    service.getTicket('ticket-1').subscribe((ticket) => {
      received = ticket;
    });

    const req = httpTesting.expectOne(`${baseUrl}/ticket-1`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedTicket);

    expect(received).toEqual(expectedTicket);
  });

  it('should create a new ticket with POST', () => {
    const expectedTicket: Ticket = {
      id: 'ticket-1',
      title: 'Bug login',
      description: 'Impossible de se connecter',
      status: 'OPEN',
      solution: null,
    };
    let received: Ticket | undefined;
    const input: CreateTicketInput = {
      title: 'Bug login',
      description: 'Impossible de se connecter',
    };

    service.createTicket(input).subscribe((ticket) => {
      received = ticket;
    });

    const req = httpTesting.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(input);
    req.flush(expectedTicket);

    expect(received).toEqual(expectedTicket);
  });

  it('should set "IN_PROGRESS" for ticket status with PATCH', () => {
    const expectedTicket: Ticket = {
      id: 'ticket-1',
      title: 'Bug login',
      description: 'Impossible de se connecter',
      status: 'IN_PROGRESS',
      solution: null,
    };
    let received: Ticket | undefined;

    service.setInProgress('ticket-1').subscribe((ticket) => {
      received = ticket;
    });

    const req = httpTesting.expectOne(`${baseUrl}/ticket-1/in-progress`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toBeNull();
    req.flush(expectedTicket);

    expect(received).toEqual(expectedTicket);
  });

  it('should solve the ticket with PATCH', () => {
    const expectedTicket: Ticket = {
      id: 'ticket-1',
      title: 'Bug login',
      description: 'Impossible de se connecter',
      status: 'CLOSED',
      solution: 'fix',
    };
    let received: Ticket | undefined;

    service.solve('ticket-1', 'fix').subscribe((ticket) => {
      received = ticket;
    });

    const req = httpTesting.expectOne(`${baseUrl}/ticket-1/solve`);
    expect(req.request.method).toBe('PATCH');

    /** use toStrictEqual to compare objects strictly */
    expect(req.request.body).toStrictEqual({ solution: 'fix' });
    req.flush(expectedTicket);

    expect(received).toEqual(expectedTicket);
  });
});
