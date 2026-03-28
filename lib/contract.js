import { cvToJSON, fetchCallReadOnlyFunction, listCV, uintCV } from "@stacks/transactions";
// 1. FIX: Import the static constant instead of the old class
import { STACKS_MAINNET } from "@stacks/network";

export const contractAddress = process.env.NEXT_PUBLIC_STACKPAY_CONTRACT_ADDRESS;
export const contractName = process.env.NEXT_PUBLIC_STACKPAY_CONTRACT_NAME || "stackpay";

// 2. FIX: Assign the constant directly without the 'new' keyword
const network = STACKS_MAINNET;

/**
 * Premium Parser:
 * Cleans the raw Clarity JSON output into standard JS objects.
 */
const parseClarityStream = (rawTuple, id) => {
  if (!rawTuple || (rawTuple.type === "optional" && !rawTuple.value)) return null;

  // Handle nested optional/response values safely across different Stacks API versions
  const data = rawTuple.value?.data || rawTuple.value || rawTuple.data || rawTuple;

  return {
    id: parseInt(id),
    employer: data.employer?.value || data.employer,
    employee: data.employee?.value || data.employee,
    ratePerBlock: parseInt(data['rate-per-block']?.value || data.ratePerBlock?.value || data.ratePerBlock || 0),
    balance: parseInt(data.balance?.value || data.balance || 0),
    active: data.active?.value ?? data.active ?? false,
  };
};

/**
 * Fetches the total number of streams created.
 */
const getTotalStreams = async () => {
  // Safety check to prevent silent crashes
  if (!contractAddress) return 0; 

  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: "get-total-streams",
      functionArgs: [],
      network,
      senderAddress: contractAddress, // Valid as long as contractAddress exists
    });
    const json = cvToJSON(result);
    return parseInt(json.value || 0);
  } catch (err) {
    console.error("Error fetching total streams:", err);
    return 0;
  }
};

/**
 * Mainnet Optimized Fetch:
 * Batch-fetches streams based on the current ID counter.
 */
export const fetchStreams = async (userAddress = null) => {
  if (!contractAddress) {
    console.warn("StackPay: Contract address missing. Check your .env file.");
    return [];
  }

  try {
    const total = await getTotalStreams();
    if (total === 0) return [];

    // Create a list of IDs for the contract (max 50 per batch)
    const startId = Math.max(1, total - 49);
    const ids = Array.from({ length: Math.min(total, 50) }, (_, i) => uintCV(startId + i));

    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: "get-streams-batch",
      functionArgs: [listCV(ids)],
      network,
      // Use the connected user's address if available, fallback to contract address
      senderAddress: userAddress || contractAddress, 
    });

    const rawJson = cvToJSON(result);
    const rawList = rawJson.value || [];

    const parsedStreams = rawList
      .map((item, index) => parseClarityStream(item, startId + index))
      .filter(s => s !== null && s.active); // Filter out nulls and inactive streams cleanly

    // Personalization: Filter for the user's relevant streams
    if (userAddress) {
      return parsedStreams.filter(
        s => s.employer === userAddress || s.employee === userAddress
      );
    }

    return parsedStreams;
  } catch (err) {
    console.error("Failed to fetch streams batch:", err);
    return [];
  }
};
