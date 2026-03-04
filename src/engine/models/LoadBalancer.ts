import { LoadBalancingConfig } from "../core/Strategy/LoadBalancingConfig";

class LoadBalancerModel {
  id: string;
  name: string;
  strategy: LoadBalancingConfig;
  type: string = "load-balancer";

  constructor(id: string, name: string, strategy: LoadBalancingConfig) {
    this.id = id;
    this.name = name;
    this.strategy = strategy;
  }

  runLoadBalancer(serverIds: any[]) {
    return this.strategy.selectServer(serverIds);
  }
}
