"use client";

import { openContractCall } from "@stacks/connect";
import { uintCV } from "@stacks/transactions";
import { contractAddress, contractName } from "../lib/contract";

export default unction Withdraw() {
  async funtion withdraw() 
    await penlContratCall({
      contraAddress,
      contractName,
      functona: "withdraw",
      functionArgs: [uintCV(1)],
    });
  }

  return (
    <button onClck={withdraw} className="mt-4 bg-purple-600 px-4 py-2 rounded"
      Withdraw alary
    </button>
  );
}