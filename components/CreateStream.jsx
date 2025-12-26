"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV, standardPrincipalCV } from "@stacks/transactions";
import { contractAddress, contractName } from "../lib/contract";

export default function CreateStream({ onSuccess, onError }) {
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [ratePerBlock, setRatePerBlock] = useState("");
  const [initialFunding, setInitialFunding] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  async function create(e) {
    e.preventDefault();
    
    if (!employeeAddress || !ratePerBlock || !initialFunding) {
      onError?.("Please fill in all fields");
      return;
    }

    setIsCreating(true);
    try {
      await openContractCall({
        contractAddress,
        contractName,
        functionName: "create-stream",
        functionArgs: [
          standardPrincipalCV(employeeAddress),
          uintCV(parseInt(ratePerBlock)),
          uintCV(parseInt(initialFunding)),
        ],
        onFinish: (data) => {
          setEmployeeAddress("");
          setRatePerBlock("");
          setInitialFunding("");
          onSuccess?.("Stream created successfully!");
        },
        onCancel: () => {
          onError?.("Transaction cancelled");
        },
      });
    } catch (error) {
      console.error(error);
      onError?.("Failed to create stream");
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Create New Salary Stream</h3>
      <form onSubmit={create} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Employee Address
          </label>
          <input
            type="text"
            value={employeeAddress}
            onChange={(e) => setEmployeeAddress(e.target.value)}
            placeholder="ST1234..."
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Rate per Block (microSTX)
          </label>
          <input
            type="number"
            value={ratePerBlock}
            onChange={(e) => setRatePerBlock(e.target.value)}
            placeholder="100"
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1"
          />
          <p className="text-xs text-gray-400 mt-1">
            1 STX = 1,000,000 microSTX
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Initial Funding (microSTX)
          </label>
          <input
            type="number"
            value={initialFunding}
            onChange={(e) => setInitialFunding(e.target.value)}
            placeholder="1000000"
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1"
          />
        </div>
        
        <button
          type="submit"
          disabled={isCreating}
          className={`w-full px-4 py-3 rounded font-semibold ${
            isCreating
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } transition`}
        >
          {isCreating ? "Creating Stream..." : "Create Stream"}
        </button>
      </form>
    </div>
  );
}