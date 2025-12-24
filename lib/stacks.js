import { StacksNetwork } from "@stacks/network";

// Read network type from environment variable
const networkEnv = process.env.NEXT_PUBLIC_NETWORK || "testnet";

// Create network configuration based on environment
export const network = new StacksNetwork(
  networkEnv.toLowerCase() === "mainnet"
    ? { coreApiUrl: "https://stacks-node-api.mainnet.stacks.co" }
    : { coreApiUrl: "https://stacks-node-api.testnet.stacks.co" }
);