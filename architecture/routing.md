# Network Routing Architecture

How requests are forwarded, verified, and mapped inside the simulation environment.

## Adjacency Graph Building

Before starting a simulation, the engine crawls all active connections to create an instance of `GraphManager`:
- Node connections are added as directed graph edges.
- Target handlers are validated to ensure packet senders can communicate with targets (e.g. Clients can send to API Gateways or Load Balancers, but not directly to Cache layers).

## Component Decision Rules

Routing logic varies based on node models:
- **API Gateway**: Inspects incoming request endpoints (e.g. `/api/v1/posts`) and matches them to configured destination servers using string prefix checks.
- **Load Balancer**: Inspects connected servers and balances traffic using Round Robin or IP hashing logic.
- **Application Server**: Inspects request methods. GET requests are routed to Redis caches (checking for hits) and fall back to Postgres databases on misses.
- **Message Queue**: Stores requests asynchronously and feeds them sequentially to subscribed workers.