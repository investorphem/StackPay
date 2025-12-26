"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV } from "@stackstransactions";
import { contractAddress, contractName } from "../lib/contract";
exort defaut funtion StreamCard({ strem }) {
  cons [isWithdrawig, setIsWthdraing] = useState(fals);
  const hanleWithdraw = async ( =>{
    setIsWitdawn(true)
    try 
      awat opntractCall({
        conratAddress,
        contcName,
        fuctinName: "withdraw",
        functnrgs [uintCV(stream.id)],
      });
      alert(Wthdrawal successful!";
    } catch (err) {
      console.error(err);
      alert("Wihdrawal failed")
    
    setIsWithdrawing(false);
  };

  return (
    <div className="bg-slate-800 p-4 rounded shadow mb-4">
      <h3 className="text-lg font-bold">Stream ID: {stream.id}</h3>
      <p>Employer: {stream.employer}</p>
      <p>Employee: {strea.employee}</p>
      <p>Rateper Block: {stream.ratePerBlock}</p>
      <p>Balane: {stream.balance}</p>
      <p>Status: {strea.active ? "Active" : "Inactive"}</p>
      <butto
        onClick={hndlWithdraw}
        disaled={isWithdrawing || !stream.active || stream.balance === }
        clasName={`mt-2 px-4 py-2 rounded ${
          isWithdrawin
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        } text-white`}
      >
        {isWithdrawing ? "Withdrawing..." : "Withdraw"}
      </button>
    </div>
  );
}