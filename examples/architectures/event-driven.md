# Event-Driven Ingestion Architecture

Decouples ingest endpoints from database write transactions using a high-throughput Message Queue.

## Components
- **Ingestion Server**: Instantly enqueues logs to Message Queue.
- **Kafka Message Queue**: Buffers incoming payloads.
- **Payment Worker**: background processor validating transactions.
- **Notification Worker**: background processor scheduling email alerts.

## Process Flow
1. Clients submit checkout transactions.
2. Ingestion Server pushes events onto Kafka and returns an HTTP 202 Accepted response immediately.
3. Payment and Notification workers pull task partitions from Kafka, processing transactions in the background and updating databases.