# Load Balancer Component Spec

The Load Balancer balances request loads across application backend clusters.

## Core Capabilities
- **Algorithms**: Standard Round Robin traffic balance.
- **Health Checks**: Monitors node statuses and halts forwarding to offline nodes.
- **Connection Limits**: Tracks active connection limits to prevent application server thread exhaustion.
