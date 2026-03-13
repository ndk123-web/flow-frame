import RedisModel from "@/engine/models/Redis";
import ClientModel from "@/engine/models/Client";
import ServerModel from "@/engine/models/server";
import PostgresModel from "@/engine/models/Postgres";
import { SimulationManager } from "@/engine/core/Simulations/Simulation";
import { GraphManager } from "@/engine/core/Graph/graph";
import { NodeRegistry } from "@/engine/core/Graph/nodeResgistry";
import { Frame, SimBundle } from "@/engine/types";

function createSimpleCacheScenario(): SimBundle {
  const graph = new GraphManager("graph-cache");
  const registry = new NodeRegistry("registry-cache");

  // we will have 1 client and 1 server and 1 redis cache in between them
  // client -> server
  // server -> redis cache
  // server -> either fetch from cache or fetch from server and update cache

  const clientId = "client-1";
  const clientName = "Client 1";
  const clientInstance = new ClientModel(clientId, clientName);

  // add some data for redis cache, we will use the same data for postgres database to simulate cache hit and cache miss scenarios
  clientInstance.addDataToPassToNextNode("redis", [
    { rohan: "cached data for rohan" },
    { john: "cached data for john" },
    { doe: "cached data for doe" },
  ]);

  const serverId = "server-1";
  const serverName = "Server 1";
  const serverInstance = new ServerModel(serverId, serverName);

  const redisId = "redis1";
  const redisName = "Redis Cache";
  const redisInstance = new RedisModel(redisId, redisName);
  redisInstance.addData("rohan", "cached data for rohan");
  redisInstance.addData("john", "cached data for john");

  const postgresId = "postgres1";
  const postgresName = "Postgres Database";
  const postgresInstance = new PostgresModel(postgresId, postgresName);

  // add nodes to graph
  graph.addNode(clientId, clientName);
  graph.addNode(serverId, serverName);
  graph.addNode(redisId, redisName);
  graph.addNode(postgresId, postgresName);

  // add edges to graph
  graph.addEdge(clientId, serverId);
  graph.addEdge(serverId, redisId);
  graph.addEdge(serverId, postgresId);

  // register instances to registry
  registry.register(clientId, clientInstance);
  registry.register(serverId, serverInstance);
  registry.register(redisId, redisInstance);
  registry.register(postgresId, postgresInstance);

  const simulation = new SimulationManager(graph, registry);

  for (let i = 0; i < 3; i++) {
    simulation.runTest(clientId, true);
  }

  // in this simple cache scenario, we will only have 4 nodes and 3 edges, so we can hardcode the positions and styles for simplicity
  return {
    frames: simulation.getFrames() as Frame[],
    nodes: [],
    edges: [],
  };
}
