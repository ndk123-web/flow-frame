# Write-Back Caching Spec

Write strategy optimizing latency where servers write to Redis caches instantly, returning success, and sync databases asynchronously in the background.

## Simulation Focus
Observe write requests returning success instantly after updating Redis, decoupling Postgres syncing operations.