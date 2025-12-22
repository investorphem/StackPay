import { cvToJSON, callReadOnly } from "@stacks/transactions";
import { network } from "./stacks";

// Read contract info from environment variables
export const contractAddress = process.env.NEXT_PUBLIC_STACKPAY_CONTRACT_ADDRESS;
export const contractName = process.env.NEXT_PUBLIC_STACKPAY_CONTRACT_NAME || "stackpay";

// Fetch all active streams from the smart contract
export const fetchStreams = async () => {
  try {
    const result = await callReadOnly({
      contractAddress,
      contractName,
      functionName: "get-all-streams", // read-only function in your Clarity contract
      functionArgs: [],
      network,
    });
    return cvToJSON(result); // returns array of stream objects
  } catch (err) {
    console.error("Failed to fetch streams:", err);
    return [];
  }
};