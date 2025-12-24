import { StacksMainnet, StacksTestnet } from "@stacks/network";

/**
 * lib/stacks.js
 * Updated for Stacks.js v7+ (2025 compatibility)
 */

// Read network type from environment variable
const networkEnv = process.env.NEXT_PUBLIC_NETWORK || "testnet";

// Determine which network class to instantiate
// In v7, use 'url' instead of 'coreApiUrl' for custom configurations
export const network = networkEnv.toLowerCase() === "mainnet"
    ? new StacksMainnet({ url: "https://stacks-node-api.mainnet.stacks.co" })
    : new StacksTestnet({ url: "https://stacks-node-api.testnet.stacks.co" });

// Log configuration for debugging (optional, only in development)
if (process.env.NODE_ENV === 'development') {
    console.log(`Stacks Network initialized for: ${networkEnv}`);
}
