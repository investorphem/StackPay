import { cvToJSON, fetchCallReadOnlyFunction, uintCV } from "@stacks/transactions";
import { network } from "./stacks";

// Contract info from environment variables
export const contractAddress = process.env.NEXT_PUBLIC_STACKPAY_CONTRACT_ADDRESS;
export const contractName = process.env.NEXT_PUBLIC_STACKPAY_CONTRACT_NAME || "stackpay";

// Fetch all active streams from the smart contract
export const fetchStreams = async () => {
  if (!contractAddress) {
    console.error("Contract address is not defined in environment variables.");
    return [];
  }

  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: "get-all-streams",
      functionArgs: [],
      network,
      senderAddress: contractAddress,
    });

    return cvToJSON(result); // v8+ returns proper JSON object
  } catch (err) {
    console.error("Failed to fetch streams:", err);
    return [];
  }
};

// Get current block height
export const getCurrentBlockHeight = async () => {
  try {
    const response = await fetch(`${network.url}/v2/info`);
    const data = await response.json();
    return data.stacks_tip_height;
  } catch (err) {
    console.error("Failed to fetch block height:", err);
    return 0;
  }
};

// Fetch a specific stream
export const fetchStream = async (streamId) => {
  if (!contractAddress) {
    console.error("Contract address is not defined in environment variables.");
    return null;
  }

  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: "get-stream",
      functionArgs: [uintCV(streamId)],
      network,
      senderAddress: contractAddress,
    });

    return cvToJSON(result);
  } catch (err) {
    console.error("Failed to fetch stream:", err);
    return null;
  }
};