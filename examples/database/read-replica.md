# Read-Replica Topology Spec

Separates read operations from write operations to optimize performance, redirecting reads to a database replica and writes to a primary master database.

## Components
- **Client**: Write and read commands.
- **Server**: Routes requests based on actions.
- **Master Postgres (Write)**: Receives database writes.
- **Replica Postgres (Read)**: Receives database read queries.

## Simulation Focus
Inspect how write requests connect to Master PostgreSQL databases, and watch read operations route directly to Read Replicas.