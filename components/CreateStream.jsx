"use client";

import { openContractCall } from "@stacks/connect";
import { uintCV, standardPrincipalCV } from "@stacks/transactions"
import { contractAddress, coN } from "../lib/contract";

export default unctio reteStream() {
  async function creat
    await openContractCl({
      contractddress
      contractName,
      functionNae: "create-rem
      functioArg
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