# Getting Started with FlowFrame

FlowFrame is an interactive visual simulator for designing and testing distributed system topologies. This guide covers how to load architectures and execute your first simulation.

## Accessing the Sandbox

1. Open the FlowFrame application in your web browser (hosted at your deployment domain or local server).
2. Navigate to the **Sandbox** page by clicking **Open Sandbox** from the home screen.

## Importing a System Design Template

This repository contains pre-configured distributed architectures inside the `examples/` directory.

To load an example template into your visual workspace:
1. Navigate to the `examples/` folder of this repository in your file explorer or copy the contents of the desired `.json` file.
2. In the FlowFrame workspace sidebar footer, click the **Import** button.
3. Select the target example JSON file (for example, `examples/caching/cache-aside.json`).
4. The sandbox canvas will immediately populate with the configured nodes, labels, and connection routes.

## Running Your First Simulation

1. Once a template loads, click the **Play** button on the bottom timeline panel.
2. You will see request packets (cyan dots) spawn from Client nodes and flow along the routing lines to Load Balancers, API Gateways, and backend servers.
3. Watch the logs terminal output database write logs, cache hits, or gateway routing statuses.
4. Click **Pause** or use the **Step-Seek** arrow buttons to analyze flow behavior frame-by-frame.
5. Select any node (such as a server or database) to inspect real-time metrics, connection pool queues, or cache status keys in the right sidebar panel.