# Workspace UI Components

Detailed overview of the React component structures rendering the interactive canvas dashboard.

## Viewport Layout

The main workspace viewport splits into distinct interactive regions:
1. **Header Component**: SiteHeader provides site branding, sandbox mode quicklinks, and theme selections.
2. **Left Sidebar Panel**: Features the drag-and-drop component library, prebuilt template loader, and clear canvas controls.
3. **Canvas Workspace Container**: Houses the React Flow grid rendering nodes, custom edges, background dots, and viewport zoom controls.
4. **Inspector Sidebar Panel**: Renders on the right viewport margin when a node is selected. Controls key configs (DB values, routing types).
5. **Timeline Dock Terminal**: Renders at the bottom of the viewport. Controls simulation runs (Play, Pause, Step-Seek) and debug logs.