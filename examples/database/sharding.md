# Database Sharding Spec

Distributes table records across multiple database instances based on sharding keys to increase load tolerance.

## Components
- **Client**: User request.
- **App Server**: Resolves sharding key algorithms.
- **Postgres Shard 1**: Handles user keys `0-500`.
- **Postgres Shard 2**: Handles user keys `501-1000`.

## Simulation Focus
Trace how application servers calculate partition slots and route requests to Shard 1 or Shard 2.