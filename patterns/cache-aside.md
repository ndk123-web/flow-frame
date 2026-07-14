# Cache-Aside Pattern

Application servers look up cached values in Redis first. On cache misses, values are fetched from PostgreSQL, written back to Redis, and returned to clients.

## Process Flow
1. Server queries Redis cache.
2. Redis hit: Data returns directly.
3. Redis miss: Server queries PostgreSQL database.
4. Server writes database records back to Redis cache.
5. Data returns to client.