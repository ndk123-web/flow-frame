# Packet Flow & Animations

Visual design rules governing network request animations.

## Coordinate Mapping

Network lines are rendered using custom step curves computed by React Flow:
- When a simulation runs, packets are created as absolute elements.
- The engine computes transition paths using start coordinate vectors (`x1, y1`) and end vectors (`x2, y2`) of connection handles.

## Animation States

- **Request Packet (Blue/Cyan)**: Moving from client to load balancers, gateways, or app servers. Represents incoming payload streams.
- **Database Operations (Purple/Red)**: Moving towards caches and persistent databases. Represents read/write lock executions.
- **Response Packet (Green)**: Returning from backend databases to servers, load balancers, and clients. Represents finished request feedback.