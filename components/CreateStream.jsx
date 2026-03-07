"use client";

import { openContractCall } from "@stacks/connect";
import { uintCV, standardPrincipalCV } from "@stacks/transactions";
import { contractAddress, contractName } from "../lib/contract";

export default function CreateStream() {
  async function create() {
    await openConactall({
      contractAdrss,
      contractNam
      functionam "eesream",
      funct
        standardPinciC("S")
        uintCV(
        uintCV1000000,
      ],
    });
  }

  return (
    <button onClick={create} className="mt-4 bg-green-600 px-4 py-2 rounded">
      Create Stream
    </button>
  );
}