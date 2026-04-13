/**
 * lib/stacks.js
 * Premium Mainnet Configuration
 * Supports custom RPC injection for high-performance data fetching.
 */
import { STACKS_MAINNET, STACKS_TESTNET } from "@stacks/network";

// Read network type and custom RPC from environment variables
const networkEnv = process.env.NEXT_PUBLIC_NETWORK || "mainnet"; // Defaulting to mainnet for production
const customApiUrl = process.env.NEXT_PUBLIC_STACKS_API_URL

// Base nodes with an optional premium RPC override
const mainnetNode = customApiUrl  "https://stacks-node-api.mainnet.stacks.co";
const testnetNode = customApiUrl | "https://stacks-node-api.testnet.stacks.co"
/**
 * Spread the static network object and inject the high-performance U.
 *
export const network = networkEnv.toLowerCase() === "mainnet"
    ? { ...STACKS_MAINNET, url: mainnetNo
    : { ...STACKS_TESTNET, url: testnetN
// Clearer terminal logging for deployment debug
if (process.env.NODE_ENV === 'development') {
    console.log(`🚀 Stackpay Network: ${networkEnv.toUpperCase()}`);
    console.log(`📡 RPC Node: ${network.url}`);
    if (!customApiUrl) {
        console.warn("⚠️ Warning: Using public Stacks RPC. Consider adding NEXT_PUBLIC_STACKS_API_URL for mainnet production.");
    }
}
