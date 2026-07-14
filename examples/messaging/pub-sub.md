# Pub/Sub Messaging Spec

Broadcast coordination where messages published to broker channels are immediately fanned out to multiple subscriber servers.

## Components
- **Client**: Publishes logs.
- **App Server**: publisher node.
- **Pub/Sub Broker**: routes events.
- **Subscriber Server 1 & 2**: consumer nodes.
- **Postgres / Redis**: subscriber databases.

## Simulation Focus
Observe event fanout pathing where a single published packet translates into multiple concurrent worker actions.