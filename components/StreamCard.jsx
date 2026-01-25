"use client";

import { useState, useEffect } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV } from "@stacks/transactions";
import { contractAddress, contractName } from "../lib/contract";

export default function StreamCard({ stream, currentAddress, currentBlock, onSuccess, onError }) {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isFunding, setIsFunding] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [showFundForm, setShowFundForm] = useState(false);
  const [accruedAmount, setAccruedAmount] = useState(0);

  const isEmployer = currentAddress === stream.employer;
  const isEmployee = currentAddress === stream.employee;

  // Calculate accrued amount
  useEffect(() => {
    if (currentBlock && stream.active && stream.lastWithdrawBlock) {
      const blocks = currentBlock - stream.lastWithdrawBlock;
      const earned = blocks * stream.ratePerBlock;
      const payable = Math.min(earned, stream.balance);
      setAccruedAmount(payable);
    }
  }, [currentBlock, stream]);

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    try {
      await openContractCall({
        contractAddress,
        contractName,
        functionName: "withdraw",
        functionArgs: [uintCV(stream.id)],
        onFinish: () => {
          onSuccess?.("Withdrawal successful!");
          setTimeout(() => window.location.reload(), 2000);
        },
        onCancel: () => {
          onError?.("Withdrawal cancelled");
        },
      });
    } catch (err) {
      console.error(err);
      onError?.("Withdrawal failed");
    } finally {
      setIsWithdrawing(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this stream? Remaining balance will be refunded.")) {
      return;
    }
    
    setIsCancelling(true);
    try {
      await openContractCall({
        contractAddress,
        contractName,
        functionName: "cancel-stream",
        functionArgs: [uintCV(stream.id)],
        onFinish: () => {
          onSuccess?.("Stream cancelled successfully!");
          setTimeout(() => window.location.reload(), 2000);
        },
        onCancel: () => {
          onError?.("Cancellation cancelled");
        },
      });
    } catch (err) {
      console.error(err);
      onError?.("Cancellation failed");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleFund = async (e) => {
    e.preventDefault();
    if (!fundAmount || parseInt(fundAmount) <= 0) {
      onError?.("Please enter a valid amount");
      return;
    }

    setIsFunding(true);
    try {
      await openContractCall({
        contractAddress,
        contractName,
        functionName: "fund-stream",
        functionArgs: [uintCV(stream.id), uintCV(parseInt(fundAmount))],
        onFinish: () => {
          onSuccess?.("Stream funded successfully!");
          setFundAmount("");
          setShowFundForm(false);
          setTimeout(() => window.location.reload(), 2000);
        },
        onCancel: () => {
          onError?.("Funding cancelled");
        },
      });
    } catch (err) {
      console.error(err);
      onError?.("Funding failed");
    } finally {
      setIsFunding(false);
    }
  };

  const formatSTX = (microSTX) => {
    return (microSTX / 1000000).toFixed(6);
  };

  return (
    <div className="bg-slate-800 p-5 rounded-lg shadow-lg mb-4 border border-slate-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-blue-400">Stream #{stream.id}</h3>
          <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
            stream.active ? "bg-green-600" : "bg-red-600"
          }`}>
            {stream.active ? "Active" : "Inactive"}
          </span>
        </div>
        
        <div className="text-right">
          {isEmployer && <span className="text-xs bg-purple-600 px-2 py-1 rounded">Employer</span>}
          {isEmployee && <span className="text-xs bg-cyan-600 px-2 py-1 rounded">Employee</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div>
          <p className="text-gray-400">Employer</p>
          <p className="font-mono text-xs truncate">{stream.employer}</p>
        </div>
        <div>
          <p className="text-gray-400">Employee</p>
          <p className="font-mono text-xs truncate">{stream.employee}</p>
        </div>
        <div>
          <p className="text-gray-400">Rate per Block</p>
          <p className="font-semibold">{formatSTX(stream.ratePerBlock)} STX</p>
        </div>
        <div>
          <p className="text-gray-400">Balance</p>
          <p className="font-semibold">{formatSTX(stream.balance)} STX</p>
        </div>
      </div>

      {stream.active && isEmployee && accruedAmount > 0 && (
        <div className="bg-green-900 bg-opacity-30 border border-green-600 rounded p-3 mb-4">
          <p className="text-xs text-gray-300">Accrued Earnings</p>
          <p className="text-2xl font-bold text-green-400">{formatSTX(accruedAmount)} STX</p>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {isEmployee && stream.active && (
          <button
            onClick={handleWithdraw}
            disabled={isWithdrawing || stream.balance === 0}
            className={`px-4 py-2 rounded font-semibold ${
              isWithdrawing || stream.balance === 0
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            } transition`}
          >
            {isWithdrawing ? "Withdrawing..." : "Withdraw Earnings"}
          </button>
        )}

        {isEmployer && stream.active && (
          <>
            <button
              onClick={() => setShowFundForm(!showFundForm)}
              className="px-4 py-2 rounded font-semibold bg-blue-600 hover:bg-blue-700 transition"
            >
              {showFundForm ? "Cancel" : "Add Funds"}
            </button>
            
            <button
              onClick={handleCancel}
              disabled={isCancelling}
              className={`px-4 py-2 rounded font-semibold ${
                isCancelling
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              } transition`}
            >
              {isCancelling ? "Cancelling..." : "Cancel Stream"}
            </button>
          </>
        )}
      </div>

      {showFundForm && isEmployer && (
        <form onSubmit={handleFund} className="mt-4 p-4 bg-slate-700 rounded">
          <label className="block text-sm font-medium mb-2">
            Fund Amount (microSTX)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              placeholder="1000000"
              className="flex-1 px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="1"
            />
            <button
              type="submit"
              disabled={isFunding}
              className={`px-4 py-2 rounded font-semibold ${
                isFunding
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition`}
            >
              {isFunding ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}