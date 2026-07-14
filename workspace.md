# Workspace Canvas Guide

The Workspace is an interactive editor for designing, inspecting, and playing distributed system topologies.

## Drag and Drop Interface

- **Sidebar Panel**: Found on the left side of the viewport. Displays a categorized listing of architectural shapes and components.
- **Adding Nodes**: Drag any node element (e.g. Load Balancer, Web Server) from the library and drop it onto the canvas grid, or click the library element directly to spawn it.
- **Node Resizing**: Certain decorative components (e.g. Rectangle Groups, Sticky Notes) expose boundary handles. Select the node and drag these handles to adjust boundaries.

## Canvas Connections

- **Port Routing**: Connect node systems by dragging a line from the output handle (Right or Bottom ports) of a source component to the input handle (Left or Top ports) of a target component.
- **Multi-Port Support**: Nodes have multiple port nodes to prevent overlapping lines when connecting a single component (like an API Gateway) to multiple backends.

## Node Inspector Panel

Selecting any active node opens the Node Inspector on the right viewport margin. This panel exposes:
- **Identifier**: Custom name labels and network IP addresses.
- **Node Configs**: Specific model configurations, including database records, gateway route prefixes, message queue subscriber lists, and load balancer algorithms.
- **Active Metrics**: Server capacity trackers, prefetch limits, and cache hit metrics.