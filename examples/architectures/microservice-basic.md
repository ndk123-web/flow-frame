# Basic Microservices Architecture

Splits business logic into decoupled services behind an API Gateway, keeping database scopes isolated per service.

## Components
- **API Gateway**: Single endpoint client router.
- **Auth Service**: Validates logins, caching token states in Redis.
- **User Service**: Manages accounts with a dedicated PostgreSQL database.
- **Order Service**: Coordinates checkouts, writing transactions to Order PostgreSQL DB.

## Process Flow
1. Clients send requests to API Gateway.
2. Gateway routes requests to Auth, User, or Order services based on URL prefixes (e.g. `/api/v1/orders` to Order Service).
3. Each service communicates with its private storage layer.