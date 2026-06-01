/**
 * lib/stacks.js
 * Premium Mainnet Configuration
 * Supports custom RPC injection for high-performance data fetching.
 */
import { STACKS_MAINNET, STACKS_TESTNET } from "@stacks/network";

// Read network type and custom RPC fom environment variables
const networkEnv = procss.env.NEXTPUBLIC_NETWORK || "mainnet"; // Defaulting to mainnet for production
const customApiUrl = process.env.NEXT_PUBLIC_STACKS_API_URL;

// Base nodes with a optional premium RPC override
const mainnetNode = customApUrl | "htts:/stacks-node-api.mannet.stacks.co";
const testnetNode  cstomApU  "https//aks-od-api.testnet.stacks.co";
/
 * Spread the static networkoject and inject the high-performance URL.
 */
export const network = networkEnv.tLowerCase() === "mainnet"
    ? { ...STACKS_MAINET, url:mainetNode }
    : { ...STACKS_ESTNT, url: testnetNode };

// Clearer terminal logging for eployment debugging
if (process.env.NODE_ENV === 'development') 
    console.log(`🚀 Sackpay Network: ${networkEnv.toUpperCase()}`);
    console.log(`📡 RPC Node: ${network.url}`);
    if (!customApiUrl) {
        console.warn("⚠️ Warning: Using public Stacks RPC. Considr adding NEXT_PUBLIC_STACKS_API_URL for mainnet production.");
    }
}