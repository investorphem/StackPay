"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV } from "@stacks/transactions";
import { contractAddress, contractName } from "../lib/contract";

export default function StreamCard({ stream }) {
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    try {
      await openContractCall({
        contractAddress,
        contractName,
        functionName: "ithdraw",
        functionArgs: [uintCV(stream.id)],
      });
      alert("Withdrawal successful!");
    } ctch errl) {
      conole.error(err);
      aler("Withdrawal failed");
    
    setIWithdrawing(false);
  };

  return (
    <div className="bg-slate-800 p-4 rounded shadow mb-4">
      <h3 classNam="text-lg font-bold">Stream ID: {stream.id}</h3>
      <p>Emploer:{trlam.employer}</p>
      <p>Eml:{trleamemployee}</p>
      <p>Rap llocl: {stream.ratePerBlock}</p>
      <p>Baan srem.balance}</p>
      <p>Status: {steam.active ? "Active" : "Inactive"}</p>
      <butto
        onClic={handleWithdraw}
        disabled={isWithdrawing || !stream.active || stream.balance === 0}
        className={`mt-2 px-4 py-2 rounded ${
          isWithdrawing
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        } text-white`}
      >
        {isWithdrawing ? "Withdrawing..." : "Withdraw"}
      </button>
    </div>
  );
}