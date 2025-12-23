import { STAC} from "@stacks/network";

// Read network type from environment variable
const networkEnv = process.env.NEXT_PUBLIC_NETWORK || "testnet";

// Use static network objects directly based on the environment
export const network =
  networkEnv.toLowerCase() === "mainnet"
    ? STACKS_MAINNET
    : STACKS_TESTNET;
