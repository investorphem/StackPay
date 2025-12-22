import { StacksTestnet, StacksMainnet } from "@stacks/network";

// Read network type from environment variable
const networkEnv = process.env.NEXT_PUBLIC_NETWORK || "testnet";

// Create a network instance based on the environment
export const network =
  networkEnv.toLowerCase() === "mainnet"
    ? new StacksMainnet()
    : new StacksTestnet();