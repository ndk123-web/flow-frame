type NodeId = string;

type RequestPath = {
  id: string;
  from: NodeId;
  from_name: string;
  to: NodeId;
  to_name: string;
  currentNode: string;
};

type FrameObject = {
  requestId: string;
  requestName: string;
  nodeId: NodeId;
};

export type { NodeId, RequestPath, FrameObject };
