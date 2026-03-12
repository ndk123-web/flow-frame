import { NodeId } from "../../types";
import { GraphManager } from "../Graph/graph";
import { RequestManager } from "../../models/Request";
import type { FrameObject } from "../../types";
import { NodeRegistry } from "../Graph/nodeResgistry";
import ShortUniqueId from "short-unique-id";
import { NodeInstance } from "@/engine/contracts";
import LoadBalancerModel from "@/engine/models/LoadBalancer";

class SimulationManager {
  graph: GraphManager;
  from: NodeId;
  to: NodeId;
  frames: FrameObject[] = [];
  registry: NodeRegistry;
  uid: ShortUniqueId = new ShortUniqueId({ length: 10 });
  timestamp: number = 0;

  constructor(graph: GraphManager, registry: NodeRegistry) {
    this.graph = graph;
    this.registry = registry;
    this.from = "";
    this.to = "";
  }

  // the logic is:
  // we first compute all and store into the frameManager
  // now ui will fetch accordingly to the frame path
  step(request: RequestManager) {
    this.from = request.currentNodeId;

    if (request.direction === "forward") {
      // before check current node is LOAD BALANCER, then implement load balancing logic

      const currentNode: NodeInstance | null = this.registry.getInstance(
        this.from,
      );

      if (currentNode?.type === "LOAD_BALANCER") {
        // fetch all the servers

        const servers = this.graph.getNextNodes(this.from);
        if (servers.length <= 0) {
          // no servers available, switch direction
          request.direction = "backward";
          return;
        } else {
          // implement load balancing logic
          const selectedServer = (
            currentNode as LoadBalancerModel
          ).runLoadBalancer(servers);
          if (
            selectedServer === null ||
            selectedServer === -1 ||
            selectedServer === undefined
          ) {
            // no server available, switch direction
            request.direction = "backward";
            return;
          } else {
            this.frames.push({
              requestId: request.id,
              requestName: request.name,
              from: this.from,
              to: String(selectedServer), // convert to string for storage
              timestamp: ++this.timestamp,
              action: "load_balance", // add action to indicate load balancing
            });
            // Update the current node to the selected server
            request.path.push(this.from);
            request.currentNodeId = String(selectedServer);
            return;
          }
        }
      }

      const nextNodes = this.graph.getNextNodes(this.from);

      // if no next nodes, switch direction
      if (nextNodes.length === 0) {
        request.direction = "backward";
        return;
      }

      let nextFirst = nextNodes[0];
      const instance = this.registry.getInstance(nextFirst);

      this.frames.push({
        requestId: request.id,
        requestName: request.name,
        from: this.from,
        to: nextFirst,
        timestamp: ++this.timestamp,
        action: "request_forward",
      });

      request.path.push(this.from);
      request.currentNodeId = nextFirst;
    }
  }

  runTest(startNode: NodeId, hideResponse: boolean) {
    const request_id = this.uid.rnd(10);
    const request_name = `Request_${request_id}`;
    const request = new RequestManager(request_id, request_name, startNode);

    // record the index of the first frame for the current request, so that after the simulation is done, we can add backward frames accordingly
    // initially 0 then updated to the index of the first frame for the current request after the first step is executed. This allows us to keep track of which frames belong to which request, which is crucial for adding backward frames correctly after the simulation is done.
    const forwardStartIndex = this.frames.length;

    // register the request in the registry
    this.registry.register(request_id, request);

    // run the simulation
    while (true) {
      const before = request.currentNodeId;

      this.step(request);

      // means we have reached the start node means there is something buggy
      if (request.path.length === 0 && request.direction === "backward") {
        break;
      }

      // if after step() currentNodeId and before are the same and direction is backward, it means we are stuck
      if (
        request.currentNodeId === before &&
        request.direction === "backward"
      ) {
        break;
      }
    }

    if (hideResponse) {
      return;
    }
    // after the simulation is done, we need to add backward frames for the current request
    const currentRequestForwardFrames = this.frames.slice(forwardStartIndex);
    this.addBackwardFrames(currentRequestForwardFrames);
  }

  // for each forward frame, we add a corresponding backward frame with from and to reversed, and action set to "request_backward". This allows us to visualize the response flow in the simulation, which is crucial for understanding how requests are processed and how responses are generated in a distributed system.
  addBackwardFrames(forwardFrames: FrameObject[]) {
    const backwardFrames: FrameObject[] = [];

    // we iterate the forward frames in reverse order to create backward frames, which will allow us to visualize the response flow in the correct order (i.e., the response for the last request will be visualized first, and so on).
    for (let i = forwardFrames.length - 1; i >= 0; i--) {
      const frame = forwardFrames[i];
      backwardFrames.push({
        requestId: frame.requestId,
        requestName: frame.requestName,
        from: frame.to,
        to: frame.from,
        timestamp: ++this.timestamp,
        action: "request_backward",
      });
    }

    this.frames.push(...backwardFrames);
  }

  getFrames() {
    return this.frames;
  }
}

export { SimulationManager };
