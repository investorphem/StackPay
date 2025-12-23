import { cvToJSON, fetchCallReadOnlyFunction } from "@stacks/transactions";
import { network } from "./stacks";

// Read contrac
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
      functionName: "get-all-streams", // read-only function in your Clarity contract
      functionArgs: [],
      network,
      senderAddress: contractAddress, // required for v7+
    });
    
    // cvToJSON returns an object { value, type }; we typically want the 'value'
    const jsonResponse = cvToJSON(result);
    return jsonResponse.value || jsonResponse; 
  } catch (err) {
    console.error("Failed to fetch streams:", err);
    return [];
  }
};
