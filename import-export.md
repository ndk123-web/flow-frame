# Serialization & Import/Export

FlowFrame supports local workspace files saving and restoration through JSON serialization.

## JSON Serialization Schema

Topologies are exported as a unified JSON object containing:
- **version**: Schema validation tracker.
- **nodes**: Array of React Flow node coordinates, labels, styles, and custom types.
- **edges**: Array of network connection lines, handles, and path styles.
- **nodeConfigs**: Map of customized configurations (database records, server routes) associated with node IDs.

## Capture Image

The Capture diagram utility uses `html-to-image` to convert the active react-flow viewport canvas container to a PNG image:
- Filters out interactive layout panels (Minimap, control boards, sidebars).
- Saves nodes and connections in their actual dimensions.
- Downloads directly as a static file locally.