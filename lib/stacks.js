import { StacksTestnet, StacksMainnet } from "@stacks/network";

// Read network type from environment variable
const networkEnv = process.env.NEXT_PUBLIC_NETWORK || "testnet";

export const network =
  networkEnv.toLowerCase() === "mainnet"
    ? new StacksMainnet()
    : new StacksTestnet();