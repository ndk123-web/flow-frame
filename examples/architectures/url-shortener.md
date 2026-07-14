# URL Shortener Architecture

High read-throughput system optimized for instant redirects using Redis caches and Postgres fallback stores.

## Components
- **Redirect Server**: Decodes hash strings.
- **Redis Cache**: Caches mapping redirects.
- **Postgres DB**: Backup database storing hashes.
- **Analytics Queue**: Buffers redirect telemetry log events.
- **Analytics Worker**: background consumer writing telemetry metrics.

## Process Flow
1. User hits redirect shortlink.
2. Redirect Server checks Redis. Hit returns immediate HTTP 302 redirect.
3. On miss, query Postgres, populate Redis, and redirect.
4. Server queues redirection metrics to Analytics Queue, processed by Analytics Worker.