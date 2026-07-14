# Event Processing Queue

FlowFrame simulates synchronous and asynchronous requests using an event-driven queue model.

## Core Simulation Loop

1. **Packet Spawning**: Request triggers create new payload event packets.
2. **Event Queue Insertion**: Events are pushed onto a processing stack grouped by sequence step timestamps.
3. **Execution Resolution Extent**:
   - Synchronous routes block server processing threads until database responses return.
   - Asynchronous routes (e.g. Message Queue pub-sub) push payloads into intermediate queue buckets and immediately return HTTP 202 Accepted status codes to callers.
- **Metrics Updates**: Latency statistics and capacity metrics are logged dynamically.