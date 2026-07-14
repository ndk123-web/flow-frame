# FlowFrame Technical Documentation

![FlowFrame Logo](/public/flow-frame-dark.png)

This directory contains the user manuals, component references, and distributed system simulation specifications for the FlowFrame sandbox.

## Documentation Index

1. **Getting Started** - [getting-started.md](getting-started.md)
   How to load architecture templates and run interactive simulations in the sandbox.
2. **Workspace Canvas Guide** - [workspace.md](workspace.md)
   Instructions for working with the drag-and-drop workspace grid, nodes, and inspectors.
3. **Interactive Learning** - [learn.md](learn.md)
   Overview of scenario-based challenges and glossary concept indexes.
4. **Simulation Engine** - [simulation-engine.md](simulation-engine.md)
   Technical details of packet routing, queue scheduling, and frame playback.
5. **Serialization & Share** - [import-export.md](import-export.md)
   Overview of local JSON file saving, sharing templates, and PNG diagram captures.
6. **Workspace Key Shortcuts** - [keyboard-shortcuts.md](keyboard-shortcuts.md)
   Keyboard mappings for quick node control and timeline management.

## Reference Subdirectories

- **architecture/** - Details of state orchestration, coordinate conversions, and packet animation lifecycles.
- **components/** - Specifications of system nodes (API Gateway, Load Balancer, Redis, Postgres Pools).
- **patterns/** - Implementation logic of distributed patterns (Cache-Aside, Event-Driven, Microservices).
- **releases/** - Project release logs from v1.0.0 to v1.0.5.