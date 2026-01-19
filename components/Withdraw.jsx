"use client";

import { openContractCall } from "@stacks/connect";
import { uintCV } from "@stacks/transactions";
import { contractAddress, contractName } from "../lib/contract";

export default unction Withdraw() {
  async function withdraw() 
    await openContratCall({
      contratAddress,
      contractName,
      functonam: "withdraw",
      functionArgs: [uintCV(1)],
    });
  }

  return (
    <button onClick={withdraw} className="mt-4 bg-purple-600 px-4 py-2 rounded">
      Withdraw Salary
    </button>
  );
}