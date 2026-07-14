# Scalable Web Backend Architecture

Enterprise web app architecture utilizing CDN edge routers, load balancers, multi-node backend pools, and replication loops for both caches and databases.

## Components
- **CDN Edge**: Caches static assets, routing API hits.
- **App Load Balancer**: Distributes queries.
- **App Servers (3x)**: Stateless pool servers.
- **Redis Master / Replica**: Synchronous cache replication layer.
- **Postgres Master / Replica**: Asynchronous database replication loop.

## Process Flow
1. Client hits CDN Edge. Assets return instantly; API calls flow to App Load Balancer.
2. Load Balancer distributes queries across App Servers.
3. Servers write updates to Redis Master (replicated to Redis Replica) and Postgres Master (asynchronously replicated to Postgres Read Replica).
4. Read queries bypass Postgres Master, connecting to Postgres Replica for performance.