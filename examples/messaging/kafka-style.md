# Kafka-Style Event Stream Spec

Partitions event logs inside a high-throughput messaging broker to achieve parallel processing.

## Components
- **Publisher**: Writes event offsets.
- **Broker (Topic partitions)**: Replicated logging partitions.
- **Consumer Group**: Decentralized consumer worker cluster.

## Simulation Focus
Observe partitioned message streaming where consumer threads coordinate offset positions.