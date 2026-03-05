import type { NodeId, RequestPath } from "../types";

class RequestManager {
  id: string;
  name: string;
  currentNodeId: NodeId;
  path: any[] = [];
  direction: "forward" | "backward" = "forward";

  constructor(id: string, name: string, startNodeId: NodeId) {
    this.id = id;
    this.name = name;
    this.currentNodeId = startNodeId;
  }

  //move to the next node
  moveTo(nodeId: NodeId) {
    this.currentNodeId = nodeId;
  }

  // go back to the previous node
  goBack() {
    this.currentNodeId = this.path.pop()!;
  }
}

export { RequestManager };
