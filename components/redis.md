# Redis Cache Component Spec

Redis cache is an in-memory key-value store optimizing database reads.

## Core Capabilities
- **In-Memory Storage**: Tracks active lookup hit keys and returns results instantly.
- **Cache Eviction**: Simple eviction rules to handle memory bounds.
- **Cache Failover**: Application servers bypass cache layers and fall back directly to databases if Redis becomes unreachable.