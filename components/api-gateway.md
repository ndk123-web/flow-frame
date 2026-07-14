# API Gateway Component Spec

The API Gateway routes client traffic to internal services using prefix-matching rules.

## Core Capabilities
- **Endpoint Prefix Routing**: Match endpoints (e.g. `/api/v1/users`) to internal application server nodes.
- **Failover Handling**: Returns HTTP 502 Bad Gateway if destination servers are unreachable.
- **Load Distribution**: Supports routing requests using specific strategies (e.g. Round Robin) to matching destination clusters.
