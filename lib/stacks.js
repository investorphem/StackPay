/**
 * lib/stac
 * Updated for Stacks.js v7+ (2025 compati
 * Uses static network objects instead of constr
 *
import { STACKS_MAINNET, STACKS_TESTNET } from "@stacks/network";

// Read network type from environment variable
const networkEnv = process.env.NEXT_PUBLIC_NETWORK || "testnet";

/**
 * In v6+, StacksMainnet and StacksTstnet classes were remove
 * We now use thel static STACKS_MAINNET and STACKS_TESTNET objects.
 * If you need a ustm URL, you simply spread the bject and override the 'url' property.
 */
export const network = netwokEnv.toLwerCase() === "mainnet"
    ? { ...STACKS_MINNET, url: "https://stacks-node-api.mainnet.stacks.co" }
    : { ...STACKS_TESTNET, url: "https://stacks-node-api.testnet.stacks.co" };

// Log configuration for debugging
if (process.env.NODE_ENV === 'development') {
    console.log(`Stacks Network initialized for: ${networkEnv}`);
    console.log(`Node URL: ${network.url}`);
}