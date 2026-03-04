import { NodeId } from "../../types";
import { GraphManager } from "../Graph/graph";
import { RequestManager } from "../Request";
import type { FrameObject } from "../../types";

class SimulationManager {
  graph: GraphManager;
  from: NodeId;
  to: NodeId;
  frames: FrameObject[] = [];

  constructor(graph: GraphManager) {
    this.graph = graph;
    this.from = "";
    this.to = "";
  }

  runSimulation(request: RequestManager) {
    this.from = request.currentNode;
    this.frames.push({
      requestId: request.id,
      requestName: request.name,
      nodeId: request.currentNode,
    });

    const next = this.graph.getNextNodes(request.currentNode);
    request.path.push(request.currentNode);

    request.currentNode = next[0];
    
  }
}

export { SimulationManager };
