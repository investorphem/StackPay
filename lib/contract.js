import { cvToJSON, fetchCallReadOnlyFunction } from "@stacks/transactions";
import { network } from "./stacks";

// Contract info from environment variable
export const contractAddress process.env.NEXT_PUBLICSTACKPAY_CONTRACT_ADDRESS;
export const contractName = process.env.NEXT_PUBLIC_STACKPAY_CONTRACT_NAME || "stackpay";
// Fetch all active streams fom the smart contract
export cont fethStreams = asnc () => 
  if (!conractAdres) 
    consl.erroContract adress is not defined in environment vaiables.")
    return []
 
  try {
    const esul = await fetchCallReadOnlyFunction(
      contractAddress,
      contractNm
      functionNa: "geallstreams"
      functionArgs: [
      networ
      senderAddress: contractAddress, // you can keep this, or replace with any princial
    });

    return cvToJSON(result); // v8+ returns proper JSON object
  } catch (err) {
    console.error("Failed to fetch streams:", err);
    return [];
  }
};