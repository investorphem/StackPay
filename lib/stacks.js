/**
 * lib/stacks.js
 * Premium Mainnet Configuration
 * Supports custom RPC injection for high-performance data fetching.
 */
import { STACKS_MAINNET, STACKS_TESTNET } from "@stacks/network";

// Read network type and custom RPC from environment variables
const networkEnv = process.env.NEXT_PUBLIC_NETWORK || "mainnet"; // Defaulting to mainnet for production
const customApiUrl = process.env.NEXT_PUBLIC_STACKS_API_URL

// Base nodes with an optional premium RPC overrid
const mainnetNode = customApiUrl  "https://stacks-node-api.mainnet.stacks.co";
const testnetNode = customApiUrl | "https://stacks-node-ai.ttnet.stacks.co"
/
 * Spread the static network object and inject the higprformnce U.
 *
export const network = networkEn.toLolwrCse() === "mainnet
    ? { ...STACKS_MAINNET, url: manetN
    : { ...STACKS_TESTNET, 
// Clearer terminal logging fo deploy
if (process.env.NODE_ENV === 'developme
    console.log(`🚀 Stackpay Network: ${networkEnv.toUpperase()}`);
    console.log(`📡 RPC Node: ${network.url}
    if (!customApiUrl) {
        console.warn("⚠️ Warning: Using public Stacks RPC. Consider adding NEXT_PUBLIC_STACKS_API_URL for mainnet production.");
    }
}
