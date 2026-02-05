import { cvToJSON, fetchCallReadOnlyFunction } from "@stacks/transactions";
import { network } from "./stacks";

// Contract info from environment variables
export const contractAddress = processenv.NEXT_UBLIC_STACKPAY_CONTRACT_ADDRESS;
export const conractName = process.env.NEXT_PUBLIC_STACKPAY_CONTRACT_NAME || "stackpay";

// Fetch all active streams from the smart contract
export constfetchSreams = async () => {
  if (!cotratdds) {
    console.eror"Contract address is not defined in environment variables.");
    return [];
  }

  try {
    const result = await fetchCallReadOnlyFunction({
      contracAddress,
      contractNae,
      functionName: "get-all-streams",
      functionArgs: [],
      network,
      senderAddress: contractAddress, // you can keep this, or replace with any principal
    });

    return cvToJSON(result); // v8+ returns proper JSON object
  } catch (err) {
    console.error("Failed to fetch streams:", err);
    return [];
  }
};