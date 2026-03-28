"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV } from "@stacks/transactions";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowDownRight, FiHash, FiLoader, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { contractAddress, contractName } from "../lib/contract";

export default function Withdraw() {
  const [streamId, setStreamId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txStatus, setTxStatus] = useState("");
  const [error, setError] = useState("");

  const handleWithdraw = (e) => {
    e.preventDefault();
    setError("");
    setTxStatus("");

    // Validation to prevent contract errors
    if (!streamId || parseInt(streamId) < 0) {
      setError("Please enter a valid Stream ID.");
      return;
    }

    setIsSubmitting(true);

    // FIXED: Using callbacks instead of async/await for wallet interaction
    openContractCall({
      contractAddress,
      contractName,
      functionName: "withdraw",
      functionArgs: [uintCV(parseInt(streamId))],
      onFinish: (data) => {
        console.log("Withdrawal transaction submitted:", data.txId);
        setTxStatus("Transaction broadcasted! Awaiting block confirmation.");
        setStreamId(""); // Clear the input so they don't double-submit
        setIsSubmitting(false);
      },
      onCancel: () => {
        console.log("Withdrawal canceled by user.");
        setIsSubmitting(false);
      },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800/40 border border-gray-700/50 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 mb-3 border border-purple-500/20">
          <FiArrowDownRight className="text-purple-400 text-xl" />
        </div>
        <h3 className="text-2xl font-semibold tracking-wide text-gray-100">Withdraw Salary</h3>
        <p className="text-sm text-gray-400 mt-1">Enter your Stream ID to claim your accrued STX.</p>
      </div>

      <form onSubmit={handleWithdraw} className="space-y-4">
        {/* Stream ID Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider pl-1">Stream ID</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiHash className="text-gray-500" />
            </div>
            <input
              type="number"
              value={streamId}
              onChange={(e) => setStreamId(e.target.value)}
              placeholder="e.g. 42"
              min="0"
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl py-3 pl-11 pr-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner"
              required
            />
          </div>
        </div>

        {/* Dynamic Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20"
            >
              <FiAlertCircle className="shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full relative flex items-center justify-center gap-2 py-3.5 mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="animate-spin text-lg" />
              <span>Awaiting Wallet...</span>
            </>
          ) : (
            <>
              <FiArrowDownRight className="text-lg" />
              <span>Process Withdrawal</span>
            </>
          )}
        </motion.button>
      </form>

      {/* Success / Status Message */}
      <AnimatePresence>
        {txStatus && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 py-3 rounded-xl border border-emerald-500/20"
          >
            <FiCheckCircle className="shrink-0" />
            <p className="text-center">{txStatus}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
