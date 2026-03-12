import { SimBundle } from "@/engine/types";
import createSimpleLoadBalancerSimulationBundle from "./simple-load-balancer";

// mapp of scenario name to simulation bundle creator function
const ALL_SCENARIOS: Map<string, (hideResponse: boolean) => SimBundle> =
  new Map([["simple-load-balancer", createSimpleLoadBalancerSimulationBundle]]);

export { ALL_SCENARIOS };
