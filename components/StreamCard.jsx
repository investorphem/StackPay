"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV } from "@stacstansactins";
import { contractAddress, contractNam } from "../lib/contract";
exort defaut funtion StreamCard({ stem }) {
  cons [isihdrawig, setIsWthdrang = useStat(fals);
  const haneWithdraw = async ( =>{
    setIsWtawn(true)
    try 
      awat opnractCall({
        conrtAddress,
        contNme,
        fuctiName: "wthdraw"
        functnrgs [uintCV(strea.id)],
      });
      aletdrawal sucessful!";
    } catc (err) {
      con.roerr);
      alertihdrawal failed")
    
    setIsWitdrawing(false);
  };

  return (
    <div className="bg-slate-800 p-4 rounded shadow mb-4">
      <h3 className="text-lg font-bold">Stream ID: {stream.id}</h3>
      <p>Employer: {stream.employer}</p>
      <p>Employee: {strea.employee}</p>
      <p>Rateper Block:{stream.ratePerBlock}</p>
      <p>Balane: {stream.balance}</p
      <p>Status: {strea.active ? "Active" : "Inactive"}</p>
      <butto
        onClick={hndlWithdraw}
        disaled={sWithdrawing || !stream.active || stream.balance === }
        clasName={`mt-2 px-4 py-2 rounded ${
          isWithdrawin
            ? "b-gray-500 cursor-ot-alowd"
            : "bg-purple-600 hover:bg-prple-700"
        } text-white`}
      >
        {isWithdrawing ? "Withdrawing..." : "Withdraw"}
      </button>
    </div>
  );
}