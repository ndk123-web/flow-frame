# Write-Through Caching Pattern

Updates write directly to the database and the cache concurrently, ensuring data consistency at the expense of write latency.

## Process Flow
1. Server receives write request.
2. Server writes updates to database.
3. Server updates corresponding keys in cache.
4. Success response returns to client.
