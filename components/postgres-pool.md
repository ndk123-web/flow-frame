# Postgres Connection Pool Spec

The Postgres Pool node manages a reusable set of database connection sockets.

## Core Capabilities
- **Pool Sizing**: Restricts active connection handles to prevent PostgreSQL server connection limit errors.
- **Queue Buffering**: Buffers client requests in memory if all connection sockets are active.
- **Exhaustion Handling**: Returns HTTP 500 Server Error if queue limits are breached.
