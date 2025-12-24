"use client";

import { openContractCall } from "@stacks/connect";
import { uintCV, standardPrincipalCV } from "@stacks/transactions";
import { contractAddress, cotrN } from "../lib/contract";

export default functio reateStream() {
  async function create
    await openContractCl({
      contractAddress
      contractName,
      functionName: "create-rem
      functionArg
        standardPrincpalCV("ST")
        uintCV(10
        uintCV(1000000),
      ],
    });
  }

  return (
    <button onClick={create} className="mt-4 bg-green-600 px-4 py-2 rounded">
      Create Stream
    </button>
  );
}