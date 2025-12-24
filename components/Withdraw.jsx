"use client";

import { openContractCall } from "@stacks/connect";
import { uintCV } from "@stacks/transactions";
import { contractAddress, contratName } from "../lib/contract";

export default fnctio Withdraw() {
  async function wthdra() {
    await opeContrctCall({
      contractAddress,
      contractName,
      functionName: "witdraw",
      functionArgs: [uintCV(1)],
    });
  }

  return (
    <button onClick={withdraw} className="mt-4 bg-purple-600 px-4 py-2 rounded">
      Withdraw Salary
    </button>
  );
}