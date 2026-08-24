# 🎧 Ticketing Web

Front-end SPA built with **Angular** for helpdesk ticket tracking and resolution. It consumes the [Ticketing API](https://github.com/loickcherimont/ticketing-api) with JWT authentication and role-based access (USER / AGENT).

## Live Demo

→ https://loickcherimont.github.io/ticketing-web-v2

> [!IMPORTANT]
> Test credentials (same as the API):
>
> | Role | Email | Password |
> |------|-------|----------|
> | USER | `john.doe@gmail.com` | `test123` |
> | AGENT | `agent@company.com` | `agent123` |

## Related Project

This frontend is the companion to the Spring Boot backend:

- **API repository** → https://github.com/loickcherimont/ticketing-api
- **API documentation (Swagger UI)** → https://ticketing-api-production-92ac.up.railway.app/

For JWT flow, endpoint details, and `curl` examples, see the [API README](https://github.com/loickcherimont/ticketing-api#readme).

## 🖥️ Tech Stack

**Frontend:**

- **Angular 22** — standalone components, signals, reactive forms
- **Bootstrap 5.3** — responsive UI
- **TypeScript 6** — strict typing aligned with API DTOs
- **RxJS** — HTTP calls to the REST API

**Testing:**

- **Vitest** (via `@angular/build:unit-test`) — unit tests, not Karma/Jasmine

**Hosting:**

- **GitHub Pages** — production deployment (`angular-cli-ghpages`)

## Features by Role

Authentication uses a JWT stored in `localStorage` and attached to every API request via an HTTP interceptor.

| Feature | Route | USER | AGENT |
|---------|-------|------|-------|
| Sign in | `/login` | ✅ | ✅ |
| List tickets | `/tickets` | ✅ | ✅ |
| Create ticket | `/tickets/new` | ✅ | ✅ |
| Ticket detail | `/tickets/:id` | ✅ | ✅ |
| Claim ticket (En cours) | list action | ❌ | ✅ |
| Resolve ticket (modal) | list action | ❌ | ✅ |

## 🚀 Setup

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/loickcherimont/ticketing-web-v2.git
cd ticketing-web-v2

# 2. Install dependencies
npm install

# 3. Start the dev server
ng serve
```

The app is available at http://localhost:4200/ and targets the **local API** (`http://localhost:8080/api`) by default.

### With Local API

To run against a local backend, start the [Ticketing API](https://github.com/loickcherimont/ticketing-api) first:

```bash
git clone https://github.com/loickcherimont/ticketing-api.git
cd ticketing-api
docker compose up -d db
SPRING_PROFILES_ACTIVE=dev ./mvnw spring-boot:run
```

See the [API setup guide](https://github.com/loickcherimont/ticketing-api#-setup) for full details.

## ▶️ Usage

1. Open the app — unauthenticated users are redirected to `/login`.
2. Sign in with the test credentials above.
3. **USER** — click **Nouveau Ticket** to create a ticket, browse the list, and open a ticket for details.
4. **AGENT** — use **En cours** to claim a ticket or **Résoudre** to close it with a solution.

For HTTP-level details (endpoints, request/response payloads), refer to the [API README](https://github.com/loickcherimont/ticketing-api#-usage).

## Build, Test & Deploy

| Command | Purpose |
|---------|---------|
| `ng serve` | Dev server (development config) |
| `ng build` | Production build → `dist/` |
| `ng test` | Vitest unit tests |
| `npm run test:coverage` | Tests with coverage report |
| `ng deploy` | Deploy to GitHub Pages |

The production build automatically targets the **Railway API** via `src/environments/environment.ts`.

## 🔑 License

<div align="center">Copyright &copy; 2026 | Loick CHERIMONT | All Rights Reserved.</div>
