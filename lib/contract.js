import { cvToJSON, fetchCallReadOnlyFunction } from "@stacks/transactions";
import { network } from "./stacks";

// Contract info from environment variables
export const contractAddress = process.env.NEXT_PUBLIC_STACKPAY_CONTRACT_ADDRESS;
export const contractName = process.env.NEXT_PUBLIC_STACKPAY_CONTRACT_NAME || "stackpay";

/**
 * Premium Web3 Data Handling:
 * Flattens nested Clarity JSON objects into clean JavaScript objects for the UI.
 */
const parseClarityStream = (rawTuple) => {
  if (!rawTuple) return null;
  
  // Safely extract values regardless of the exact cvToJSON v8 wrapping structure
  return {
    id: rawTuple.id?.value || rawTuple.id,
    employer: rawTuple.employer?.value || rawTuple.employer,
    employee: rawTuple.employee?.value || rawTuple.employee,
    // Note: Clarity uses kebab-case, JS prefers camelCase
    ratePerBlock: rawTuple['rate-per-block']?.value || rawTuple.ratePerBlock || 0,
    balance: rawTuple.balance?.value || rawTuple.balance || 0,
    active: rawTuple.active?.value ?? rawTuple.active ?? false,
  };
};

/**
 * Fetches and parses streams.
 * @param {string} userAddress - Optional. If provided, filters streams for this specific user.
 */
export const fetchStreams = async (userAddress = null) => {
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

    const rawJson = cvToJSON(result);
    
    // Depending on if the contract returns `(ok (list ...))` or just `(list ...)`, 
    // we need to unwrap the top-level response safely.
    const rawList = rawJson?.value?.value || rawJson?.value || rawJson || [];
    
    if (!Array.isArray(rawList)) {
      console.warn("Contract did not return a list. Received:", rawJson);
      return [];
    }

    // Parse the raw Clarity tuples into clean React-friendly objects
    const parsedStreams = rawList
      .map(item => parseClarityStream(item?.value || item))
      .filter(Boolean); // Drop any nulls

    // Mainnet Optimization: Filter on the client if a user address is passed
    if (userAddress) {
      return parsedStreams.filter(
        stream => stream.employer === userAddress || stream.employee === userAddress
      );
    }

    return parsedStreams;

  } catch (err) {
    console.error("Mainnet RPC Error - Failed to fetch streams:", err);
    return []; // Fail gracefully so the UI shows "No streams" instead of crashing
  }
};
