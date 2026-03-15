import { NodeId } from "../../types";
import { GraphManager } from "../Graph/graph";
import { RequestManager } from "../../models/Request";
import type { Frame } from "../../types";
import { NodeRegistry } from "../Graph/nodeResgistry";
import ShortUniqueId from "short-unique-id";
import { NodeInstance } from "@/engine/contracts";
import LoadBalancerModel from "@/engine/models/LoadBalancer";
import RedisModel from "@/engine/models/Redis";
import PostgresModel from "@/engine/models/Postgres";
import { serverHooks } from "next/dist/server/app-render/entry-base";
import ServerModel from "@/engine/models/server";
import { time } from "console";
import { data } from "framer-motion/client";

class SimulationManager {
  graph: GraphManager;
  from: NodeId;
  to: NodeId;
  frames: Frame[] = [];
  registry: NodeRegistry;
  uid: ShortUniqueId = new ShortUniqueId({ length: 10 });
  timestamp: number = 0;
  payloadForRequest: { [key: string]: any } = {};
  redisLookupCursor: number = 0;

  constructor(
    graph: GraphManager,
    registry: NodeRegistry,

    // means the object.key is string and object.value.key is string and object.value.value can be anything, this is used to pass data from one node to another node in the simulation, for example, client can pass some data to server which will be stored in the registry and then server can pass the same data to redis cache or postgres database, this will help us to simulate cache hit and cache miss scenarios in the simple cache scenario
    payloadForRequest: { [key: string]: any } = {},
  ) {
    this.graph = graph;
    this.registry = registry;
    this.from = "";
    this.to = "";
    this.payloadForRequest = payloadForRequest;
  }

  addFrame(from: NodeId, to: NodeId, action: string, requestId: string) {}

  runSimulation() {
    const requestId = this.uid.rnd(10);
    const requestName = `Request-${requestId}`;

    // runSimulation Always creates a new Request For each simulation
    const request = new RequestManager(
      requestId,
      requestName,
      this.from,
      this.payloadForRequest,
    );

    // it gives the next nodeId's
    const nextNodes = this.graph.getNextNodes(this.from);

    // if there is no next node then it means the simulation has reached the end and we can return the frames
    if (nextNodes.length === 0) {
      return;
    }

    // TODO if there are nodes then get `from` Node
    const fromNodeInstance = this.registry.getInstance(this.from);

    // 100% there will be an instance
    if (!fromNodeInstance) {
      return;
    }

    // get the type of the node
    const nodeType = fromNodeInstance.type;

    switch (nodeType) {
      case "CLIENT":
        // for client node we will directly move to the next node and create a frame for it
        const toNodeId = nextNodes[0];
        this.frames.push({
          requestId: request.id,
          from: this.from,
          to: toNodeId,
          timestamp: this.timestamp++,
          action: "CLIENT_SEND_REQUEST",
        });

        // move the request to the next node
        request.currentNodeId = toNodeId;

        // add last node
        request.context["lastNode"] = this.from;

        // update the from and to for the next iteration
        this.from = toNodeId;
        this.to = "";
        break;

      // TODO for server node we will check the payload and then decide whether to move to the next node or not, for example, if the payload has some data then we can move to the next node which is redis cache and if the payload does not have any data then we can move to the next node which is postgres database, this will help us to simulate cache hit and cache miss scenarios in the simple cache scenario
      case "LOAD_BALANCER":
        // we already have the nextNodes
        const lbInstance = this.registry.getInstance(
          this.from,
        ) as LoadBalancerModel;

        // if there are multiple next nodes then we will use the load balancer algorithm to select the next node, for example, we can use round robin algorithm to select the next node from the list of next nodes, this will help us to simulate load balancing scenarios in the simulation
        if (nextNodes.length === 0) {
          return;
        }

        // for now we will directly select the first node from the list of next nodes, but in future we can implement different load balancing algorithms to select the next node from the list of next nodes, this will help us to simulate load balancing scenarios in the simulation
        const selectedNodeId = lbInstance.runLoadBalancer(nextNodes);
        this.frames.push({
          requestId: request.id,
          from: this.from,
          to: selectedNodeId,
          timestamp: this.timestamp++,
          action: "LOAD_BALANCER_FORWARD_REQUEST",
        });

        // move the request to the next node
        request.currentNodeId = selectedNodeId;
        break;

      case "SERVER":
        // here so many things can happen, for example, server can process the request and then move to the next node which is redis cache or postgres database based on the payload, this will help us to simulate different scenarios in the simulation, for now we will directly move to the next node without processing the request, but in future we can implement different processing logic based on the payload and then decide whether to move to the next node which is redis cache or postgres database, this will help us to simulate cache hit and cache miss scenarios in the simple cache scenario
        const serverInstance = this.registry.getInstance(
          this.from,
        ) as ServerModel;

        // before processing the request we will check whether the server can accept the request or not based on its load and capacity, if the server cannot accept the request then we can drop the request and create a frame for it, this will help us to simulate server overload scenarios in the simulation
        if (!serverInstance.canAccepthRequest()) {
          // if server cannot accept the request then we can drop the request and create a frame for it
          this.frames.push({
            requestId: request.id,
            from: this.from,
            to: "",
            timestamp: this.timestamp++,
            action: "SERVER_REJECT_REQUEST",
          });
          return;
        }

        // if server can accept the request then we will assign the request to the server and then move to the next node
        if (request.context["redisCacheResult"] === "CACHE_HIT") {
          this.frames.push({
            requestId: request.id,
            from: this.from,

            // if there is a cache hit then we will move to the next node which is server node
            to: request.path[this.timestamp - 1].to, // get the last node from the request path which will be server node
            timestamp: this.timestamp++,
            action: "SERVER_SEND_RESPONSE",
          });

          // move the request to the next node
          request.context["lastNode"] = this.from;
          return;
        } else if (request.context["redisCacheResult"] === "CACHE_MISS") {
          // check whether there is postgres database node in the next nodes or not, if there is postgres database node then we will move to the postgres database node and if there is no postgres database node then we will move to the next node which is server node, this will help us to simulate cache miss scenario in the simple cache scenario
          const postgresInstance: boolean = nextNodes.some((nodeId) => {
            const nodeInstance = this.registry.getInstance(
              nodeId,
            ) as PostgresModel;
            return nodeInstance.type === "POSTGRES";
          });

          if (postgresInstance) {
            const postgresNodeId = nextNodes.find((nodeId) => {
              const nodeInstance = this.registry.getInstance(
                nodeId,
              ) as PostgresModel;
              return nodeInstance.type === "POSTGRES";
            });

            // get instance of postgres database node
            const postgresNodeInstance: PostgresModel =
              this.registry.getInstance(postgresNodeId!) as PostgresModel;

            // check whether the postgres database node has the data or not based on the payload, if the postgres database node has the data then we can move to the next node which is server node and if the postgres database node does not have the data then we can drop the request and create a frame for it, this will help us to simulate cache miss scenario in the simple cache scenario
            const databaseName = "DEFAULT";
            const key = request.payload["lookUpKey"] as string;
            const data = postgresNodeInstance.getRecord(databaseName, key);

            // if there is data in the postgres database node then we can move to the next node which is server node
            // it means the data is not there inside the postgres database
            if (data === null) {
              // if there is no data in the postgres database node then we can drop the request and create a frame for it
              this.frames.push({
                requestId: request.id,
                from: this.from,
                to: request.context.lastNode, // get the last node from the request path which will be server node
                timestamp: this.timestamp++,
                action: "SERVER_SEND_RESPONSE_DATA_NOT_FOUND",
              });
              request.context["lastNode"] = this.from;
              return;
            }

            // if there is data in the postgres database node then we can move to the next node which is server node
            else {
              this.frames.push({
                requestId: request.id,
                from: this.from,
                to: request.path[request.path.length - 1].to, // get the last node from the request path which will be server node
                timestamp: this.timestamp++,
                action: "SERVER_SEND_RESPONSE",
              });
              request.context["lastNode"] = this.from;
              return;
            }
          }
        }

        const isHaveRedis = nextNodes.some((nodeId) => {
          const nodeInstance = this.registry.getInstance(nodeId) as
            | PostgresModel
            | RedisModel;
          return nodeInstance.type === "REDIS";
        });

        // priority will be logically to the redis cache then postgres
        const task = request.task;
        switch (task) {
          // for example, if the task is to get some data then we will first check whether the next nodes have redis cache or not and if they have redis cache then we will move to the redis cache node and if they do not have redis cache then we will move to the postgres database node, this will help us to simulate cache hit and cache miss scenarios in the simple cache scenario
          case "GET_DATA":
            // if there is redis cache then move to redis cache node
            if (isHaveRedis) {
              const redisNodeId = nextNodes.find((nodeId) => {
                const nodeInstance = this.registry.getInstance(nodeId) as
                  | PostgresModel
                  | RedisModel;
                return nodeInstance.type === "REDIS";
              });

              if (redisNodeId) {
                this.frames.push({
                  requestId: request.id,
                  from: this.from,
                  to: redisNodeId,
                  timestamp: this.timestamp++,
                  action: "SERVER_FORWARD_REQUEST_TO_REDIS",
                });

                // move the request to the redis cache node
                request.currentNodeId = redisNodeId;
              }
            }
        }

      case "REDIS":
        // for redis node we will check the payload and then decide whether to move to the next node or not, for example, if the payload has some data then we can move to the next node which is server and if the payload does not have any data then we can move to the next node which is postgres database, this will help us to simulate cache hit and cache miss scenarios in the simple cache scenario
        const redisInstance = this.registry.getInstance(
          this.from,
        ) as RedisModel;

        const payload = request.getPayload();
        const lookUpKey = payload["redis"]["lookUpKey"] as string;

        if (lookUpKey) {
          const lookUpData = redisInstance.getData(lookUpKey);

          if (lookUpData === null) {
            // if there is a cache miss then we will move to the postgres database node
            this.frames.push({
              requestId: request.id,
              from: this.from,
              to: request.context["lastNode"], // get the last node from the request path which will be postgres database node
              timestamp: this.timestamp++,
              action: "REDIS_CACHE_MISS",
            });
          } else {
            // if there is a cache hit then we will move to the next node which is server node
            this.frames.push({
              requestId: request.id,
              from: this.from,
              to: request.path[request.path.length - 1].to, // get the last node from the request path which will be server node
              timestamp: this.timestamp++,
              action: "REDIS_CACHE_HIT",
            });
          }
        }
    }
  }

  getFrames() {
    return this.frames;
  }
}

export { SimulationManager };
