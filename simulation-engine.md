# Simulation Engine

The FlowFrame simulator manages network event execution, packet pathing animations, and debug logs.

## Event Processing Pipeline

1. **Initialization**: When the simulation starts, the engine crawls nodes and connections to generate a Graph object.
2. **Path Resolution**: Network requests are initiated from Client nodes. Each request creates an asynchronous processing execution stack.
3. **Step Computation**: Packets traverse the resolved network paths. At each junction (e.g. Load Balancer, Cache), the engine checks lookup hit tables and schedules the next event path.
4. **Playback Frames**: Compiled packets are captured into sequential animation frame states, mapping timeline parameters.

## Animation Metrics

- **Packet Animation**: Visual indicators slide along connection lines to represent HTTP requests, database write locks, and asynchronous event triggers.
- **Simultaneous Runs**: Parallel option toggles multiple requests simultaneously, simulating real concurrent load parameters.