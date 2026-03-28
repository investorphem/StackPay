import { cvToJSON, fetchCallReadOnlyFunction, listCV, uintCV } from "@stacks/transactions";
import { network } from "./stacks";

export const contractAddress = process.env.NEXT_PUBLIC_STACKPAY_CONTRACT_ADDRESS;
export const contractName = process.env.NEXT_PUBLIC_STACKPAY_CONTRACT_NAME || "stackpay";

/**
 * Premium Parser:
 * Cleans the raw Clarity JSON output into standard JS objects.
 */
const parseClarityStream = (rawTuple, id) => {
  if (!rawTuple || rawTuple.type === "optional" && !rawTuple.value) return null;
  
  // Handle nested optional/response values
  const data = rawTuple.value || rawTuple;

  return {
    id: parseInt(id),
    employer: data.employer?.value || data.employer,
    employee: data.employee?.value || data.employee,
    ratePerBlock: parseInt(data['rate-per-block']?.value || data.ratePerBlock || 0),
    balance: parseInt(data.balance?.value || data.balance || 0),
    active: data.active?.value ?? data.active ?? false,
  };
};

/**
 * Fetches the total number of streams created.
 */
const getTotalStreams = async () => {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: "get-total-streams",
      functionArgs: [],
      network,
      senderAddress: contractAddress,
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
  if (!contractAddress) return [];

  try {
    const total = await getTotalStreams();
    if (total === 0) return [];

    // Create a list of IDs for the contract (max 50 per batch as per contract limit)
    // For large scale, you would chunk this, but for now we fetch the latest 50.
    const startId = Math.max(1, total - 49);
    const ids = Array.from({ length: Math.min(total, 50) }, (_, i) => uintCV(startId + i));

    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: "get-streams-batch",
      functionArgs: [listCV(ids)],
      network,
      senderAddress: contractAddress,
    });

    const rawJson = cvToJSON(result);
    const rawList = rawJson.value || [];

    const parsedStreams = rawList
      .map((item, index) => parseClarityStream(item, startId + index))
      .filter(s => s && s.active); // Only show active streams in the UI

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
