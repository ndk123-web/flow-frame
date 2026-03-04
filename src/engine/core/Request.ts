import type { NodeId, RequestPath } from "../types";

class RequestManager {
  id: string;
  name: string;
  currentNode: NodeId;
  path: any[] = [];
  direction: "forward" | "backward" = "forward";

  constructor(id: string, name: string, startNodeId: NodeId) {
    this.id = id;
    this.name = name;
    this.currentNode = startNodeId;
  }
}

export { RequestManager };