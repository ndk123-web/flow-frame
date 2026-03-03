import { StrategyController } from "../core/Strategy/Strategy";

class LoadBalancerModel {
  id: string;
  name: string;

  // because when its 0 then -1+0 % 3 = 0 thats it the index we need to return 
  count: number = -1; // for detecting the number of total count

  algorithm: string = "round-robin"; // by default round-robin

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  runLoadBalancer() {
    const strategy = new StrategyController(this.id, this.name);

    // get total servers from Graph Engine
    // assume
    const servers: any[] = ["S1", "S2", "S3"];
    const server_to_index = strategy.selectServer(
      servers,
      this.count,
      this.algorithm,
    );

    // it means illegal algorithm / servers
    if (server_to_index == -1) {
      return -1;
    }

    // name of that server that is ui that client see
    const should_send_to = servers[server_to_index];

    // increase load balancer count
    this.count++;

    // returns {to_name}
    return should_send_to;
  }
}
