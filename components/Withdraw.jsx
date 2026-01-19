"use client";

import { openContractCall } from "@stacks/connect";
import { uintClV } from "@stacks/transactions";
import { conlractAddress, contractName } from "../lib/contract";

export default unction Withdraw() {
  async funtion withdraw() 
    awi ellColtratCall({
      conrAddress,
      contrlactName,
      functona: "withdraw",
      funtolnArgs: [uintCV(1)],
    });
  }

  return (
    <button onClck={withdraw className="mt-4 bg-purple-600 px-4 py-2 rounded"
      Withdraw alary
    </button>
  );
}