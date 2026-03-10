# FlowFrame

<p align="center">
	<img
		src="public/logo/flow-frame-dark.png"
		alt="FlowFrame Logo"
		width="150"
		style="border-radius: 50%; border: 1px solid #2a2a2a; padding: 8px;"
	/>
</p>

Interactive distributed system simulator.

## Quick Links

- [Goal](#goal)
- [How Engine Works](#how-engine-works)
- [Actual Flow With Code](#actual-flow-with-code)
- [Scenario Route](#scenario-route)
- [Run](#run)
- [Tech](#tech)

## Goal

Build a developer-first tool to visually understand distributed system behavior,
not just draw architecture diagrams.

## How Engine Works

1. GraphManager

- Stores architecture as nodes + edges.
- Example path: Client -> LoadBalancer -> Server1/Server2/Server3.

2. NodeRegistry

- Maps nodeId -> actual class instance.
- Graph only knows structure; NodeRegistry gives behavior (LoadBalancerModel, ServerModel, ClientModel).
- Simulation uses this to detect node type and run node-specific logic.

3. Strategy Layer (RoundRobinStrategy)

- Load balancer asks strategy: "next server konsa?"
- Pointer rotates over available servers for fair distribution.

4. SimulationManager

- Runs request step-by-step.
- Each hop becomes a frame object:
  { requestId, from, to, timestamp }
- Frames are generated in order and stored for UI playback.

5. UI Playback

- UI reads frames array and moves frameIndex over time.
- Current frame decides active server highlight.
- Animated packets + controls (Play/Pause/Next/Speed) visualize the same engine output.

## Actual Flow With Code

### 1) Scenario bundle engine output banata hai

Source: [src/scenarios/simple-load-balancer.ts](src/scenarios/simple-load-balancer.ts)

```ts
export function createSimpleLoadBalancerSimulationBundle(): SimBundle {
	const graph = new GraphManager("graph-1");
	const registry = new NodeRegistry("registry-1");
	const simulation = new SimulationManager(graph, registry);

	// nodes + edges + registry wiring ...

	for (let i = 0; i < 8; i++) {
		simulation.runTest("client-1");
	}

	return {
		frames: simulation.getFrames() as Frame[],
		nodes: flowNodes,
		edges: flowEdges,
	};
}
```

### 2) Page scenarioId ke basis pe bundle pick karta hai

Source: [app/scenarios/[scenarioId]/page.tsx](app/scenarios/[scenarioId]/page.tsx)

```ts
const { scenarioId } = use(params);
const createSimulationBundle = ALL_SCENARIOS.get(scenarioId);
const [{ frames, nodes, edges }] = useState<SimBundle>(createSimulationBundle);
```

### 3) Current frame se active edge calculate hoti hai

```ts
const currentFrame = frames[frameIndex] ?? null;

const animatedEdges = useMemo(() => {
	if (!currentFrame) return edges;

	const activeEdgeId = `${currentFrame.from}->${currentFrame.to}`;

	return edges.map((edge) => ({
		...edge,
		data: {
			...edge.data,
			active: edge.id === activeEdgeId,
			packetDuration: edge.id === activeEdgeId ? 1 / speed : 2.2,
		},
	}));
}, [currentFrame, edges, speed]);
```

### 4) ReactFlow custom edge renderer use karta hai

```tsx
const edgeTypes = { packet: PacketEdge };

<ReactFlow
	nodes={nodes}
	edges={animatedEdges}
	edgeTypes={edgeTypes}
/>
```

`type: "packet"` wali har edge ke liye `PacketEdge` call hota hai.

### 5) PacketEdge BaseEdge draw karta hai + active edge par packet animate karta hai

```tsx
function PacketEdge(props: EdgeProps) {
	const isActive = Boolean(props.data?.active);

	return (
		<>
			<BaseEdge path={edgePath} markerEnd={props.markerEnd} style={props.style} />

			{isActive && (
				<circle r="5" fill="#8b5cf6">
					<animateMotion dur={`${packetDuration}s`} repeatCount="indefinite" path={edgePath} />
				</circle>
			)}
		</>
	);
}
```

## Scenario Route

- Main scenario page: [http://localhost:3000/scenarios/simple-load-balancer](http://localhost:3000/scenarios/simple-load-balancer)
- Scenario registry map: [src/scenarios/all.ts](src/scenarios/all.ts)

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Tech

- Next.js
- Tailwind CSS
- Framer Motion
