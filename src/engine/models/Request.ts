import type { NodeId } from "../types";
import { NodeInstance } from "../contracts";

class RequestManager implements NodeInstance {
  id: string;
  name: string;
  currentNodeId: NodeId;
  path: any[] = [];
  direction: "forward" | "backward" = "forward";
  type: string = "REQUEST";
  payload: { [key: string]: any } = {};
  task: string = "";
  context: { [key: string]: any } = {};

  constructor(
    id: string,
    name: string,
    startNodeId: NodeId,
    payload: { [key: string]: any } = {},
  ) {
    this.id = id;
    this.name = name;
    this.currentNodeId = startNodeId;
    this.payload = payload;
  }

  //move to the next node
  moveTo(nodeId: NodeId) {
    this.currentNodeId = nodeId;
  }

  getPayload() {
    return this.payload;
  }
}

export { RequestManager };
