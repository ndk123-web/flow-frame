# Postgres Connection Pooling Spec

Shows how connection pool managers reduce PostgreSQL database socket overhead by buffering query calls in a connection queue.

## Components
- **Client**: Requests load.
- **Server**: Receives requests.
- **Connection Pool**: Postgres pool manager node (PgBouncer).
- **Postgres DB**: SQL database instance.

## Simulation Focus
Observe how App servers handle incoming request loads and request reuse sockets from connection pool queues.