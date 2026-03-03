class StrategyController {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  // it should return me the index 
  selectServer(servers: any[], count: number, algorithm: string): number {
    const size: number = servers.length;

    if (algorithm === "round-robin") {
      return this.RoundRobinAlgorithm(servers, count);
    }

    return -1;
  }

  RoundRobinAlgorithm(servers: any[], count: number) {
    const size = servers.length;
    const nextServer = (count + 1) % size;
    return nextServer;
  }
}

export { StrategyController };
