# Message Queue Configuration

Asynchronous task execution using an order processing server, message queue broker, and database worker.

## Components
- **Client**: Initiates long-running task.
- **App Server**: Queues requests and returns status immediately.
- **Message Queue**: Message queue buffer node (RabbitMQ).
- **Worker Server**: Background task consumer.
- **Postgres DB**: Commits processed task metrics.

## Simulation Focus
Watch tasks write to the Message Queue, and observe background workers polling the queue and saving results to Postgres.