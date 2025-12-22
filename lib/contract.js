import { callReadOnlyFunction, cvToJSON } from "@stacks/transactions";
import { contractAddress, contractName } from "./contract";
import { network } from "./stacks";

// Fetch all active streams from the smart contract
export const fetchStreams = async () => {
  try {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: "get-all-streams", // read-only function in your clar
      functionArgs: [],
      network,
    });
    return cvToJSON(result); // returns array of stream objects
  } catch (err) {
    console.error("Failed to fetch streams:", err);
    return [];
  }
};