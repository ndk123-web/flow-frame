# Application Server Component Spec

The Web/Application Server handles business logic computations, caching lookups, and DB connections.

## Core Capabilities
- **Caching Logic**: Performs GET request lookups to Redis cache components. Falls back to PostgreSQL database models on cache misses.
- **Threading Models**: Manages concurrent execution threads. Capacity parameters limit maximum simultaneous packets.
- **Failover Handling**: Returns HTTP 504 Gateway Timeout if backend databases fail to resolve queries.