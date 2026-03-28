"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV } from "@stacks/transactions";
import { motion } from "framer-motion";
import { FiArrowDownRight, FiUser, FiClock, FiActivity, FiCheckCircle, FiLoader } from "react-icons/fi";
import { contractAddress, contractName } from "../lib/contract";

export default function StreamCard({ stream }) {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [txStatus, setTxStatus] = useState("");

  // Helper to neatly format Stacks addresses
  const truncateAddress = (address) => {
    if (!address) return "Unknown";
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  };

  // Convert contract micro-STX back to readable STX for the UI
  const formatSTX = (microStx) => {
    return (Number(microStx) / 1000000).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  };

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    setTxStatus("");

    // FIXED: Removed async/await/try/catch in favor of proper Stacks callbacks
    openContractCall({
      contractAddress,
      contractName,
      functionName: "withdraw",
      functionArgs: [uintCV(stream.id)],
      onFinish: (data) => {
        console.log("Withdrawal transaction submitted:", data.txId);
        // Replace jarring alert() with smooth inline UI text
        setTxStatus("Transaction broadcasted! Awaiting block confirmation.");
        setIsWithdrawing(false);
      },
      onCancel: () => {
        console.log("Withdrawal canceled by user.");
        setIsWithdrawing(false);
      },
    });
  };

  return (
    <div className="relative bg-gray-800/40 border border-gray-700/50 backdrop-blur-md rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      
      {/* Header: Stream ID & Status Badge */}
      <div className="flex justify-between items-start mb-6 border-b border-gray-700/50 pb-4">
        <div>
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            Stream #{stream.id}
          </h3>
          <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Smart Contract Data</p>
        </div>
        
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-inner ${
          stream.active 
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
            : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
        }`}>
          {stream.active ? <FiActivity className="animate-pulse" /> : <FiCheckCircle />}
          <span>{stream.active ? "Active" : "Closed"}</span>
        </div>
      </div>

      {/* Body: Stream Details Grid */}
      <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs uppercase tracking-wider">
            <FiUser size={12} />
            <span>Employer</span>
          </div>
          <p className="text-sm font-medium text-gray-200" title={stream.employer}>
            {truncateAddress(stream.employer)}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs uppercase tracking-wider">
            <FiUser size={12} />
            <span>Employee</span>
          </div>
          <p className="text-sm font-medium text-gray-200" title={stream.employee}>
            {truncateAddress(stream.employee)}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs uppercase tracking-wider">
            <FiClock size={12} />
            <span>Rate / Block</span>
          </div>
          <p className="text-sm font-medium text-purple-300">
            {formatSTX(stream.ratePerBlock)} <span className="text-xs text-gray-500">STX</span>
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs uppercase tracking-wider">
            <FiArrowDownRight size={12} />
            <span>Available Balance</span>
          </div>
          <p className="text-lg font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
            {formatSTX(stream.balance)} <span className="text-sm font-normal text-emerald-600">STX</span>
          </p>
        </div>
      </div>

      {/* Footer: Action Button & Status */}
      <div className="flex flex-col gap-3 pt-2">
        <motion.button
          whileHover={!isWithdrawing && stream.active && stream.balance > 0 ? { scale: 1.02 } : {}}
          whileTap={!isWithdrawing && stream.active && stream.balance > 0 ? { scale: 0.98 } : {}}
          onClick={handleWithdraw}
          disabled={isWithdrawing || !stream.active || stream.balance <= 0}
          className={`w-full relative flex items-center justify-center gap-2 py-3 font-semibold rounded-xl transition-all duration-300 ${
            !stream.active || stream.balance <= 0
              ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
              : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          }`}
        >
          {isWithdrawing ? (
            <>
              <FiLoader className="animate-spin text-lg" />
              <span>Requesting Signature...</span>
            </>
          ) : !stream.active ? (
            "Stream Closed"
          ) : stream.balance <= 0 ? (
            "No Funds Available"
          ) : (
            <>
              <FiArrowDownRight className="text-lg" />
              <span>Withdraw STX</span>
            </>
          )}
        </motion.button>

        {/* Smooth Inline Transaction Status */}
        {txStatus && (
          <p className="text-xs text-center text-emerald-400 bg-emerald-500/10 py-2 rounded-lg border border-emerald-500/20">
            {txStatus}
          </p>
        )}
      </div>
    </div>
  );
}
