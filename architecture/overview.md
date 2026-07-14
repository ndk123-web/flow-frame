# Architecture Overview

FlowFrame is a React application built with Next.js and styled using standard CSS variables and Tailwind.

## High-Level System Layers

```
+-------------------------------------------------------+
|                    React Flow UI Layer                |
|  - Canvas Grids       - Sidebar Controls  - Inspectors |
+---------------------------+---------------------------+
                            | (Node & Edge States)
                            v
+-------------------------------------------------------+
|                Simulation Engine Context              |
|  - Graph Manager      - Simulation Event Pipeline     |
|  - Metrics Tracker    - Frame Timeline Playback       |
+---------------------------+---------------------------+
                            | (C++ / JS core models)
                            v
+-------------------------------------------------------+
|                 Data & State Models Layer             |
|  - Client             - Server          - Redis Cache |
|  - Message Queue      - Postgres DB     - Router      |
+-------------------------------------------------------+
```

## Key Modules

- **app/workspace/page.tsx** - Visual sandbox component orchestrating canvas elements, sidebar components, and custom models.
- **engine/core/Graph/** - Manages nodes registry and builds adjacency maps to route packets.
- **engine/core/Simulations/** - Processes simulations, compiles event pipelines, and renders log sequences.
- **components/** - Modular layout components (Header, Footer, Icons, Diagrams).