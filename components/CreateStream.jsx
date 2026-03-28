"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV, standardPrincipalCV } from "@stacks/transactions";
import { motion } from "framer-motion";
import { FiSend, FiUser, FiClock, FiDollarSign, FiLoader } from "react-icons/fi";
import { contractAddress, contractName } from "../lib/contract";

export default function CreateStream({ onStreamCreated }) {
  const [recipient, setRecipient] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    // Basic Validation for Mainnet
    if (!recipient.startsWith("SP") && !recipient.startsWith("ST")) {
      setError("Please enter a valid Stacks Principal address.");
      return;
    }
    if (!duration || duration <= 0) {
      setError("Duration must be greater than 0.");
      return;
    }
    if (!amount || amount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    setIsSubmitting(true);

    // Convert UI STX value to contract micro-STX (1 STX = 1,000,000 micro-STX)
    const microStxAmount = Math.floor(parseFloat(amount) * 1000000);

    try {
      await openContractCall({
        contractAddress,
        contractName,
        functionName: "create-stream",
        functionArgs: [
          standardPrincipalCV(recipient),
          uintCV(parseInt(duration)), // Assuming duration is in blocks
          uintCV(microStxAmount),
        ],
        onFinish: (data) => {
          console.log("Transaction submitted:", data.txId);
          // Reset form on successful submission
          setRecipient("");
          setDuration("");
          setAmount("");
          
          // Trigger the dashboard to refresh the active streams list
          if (onStreamCreated) onStreamCreated();
        },
        onCancel: () => {
          console.log("Transaction canceled by user.");
          setIsSubmitting(false);
        },
      });
    } catch (err) {
      console.error("Contract call failed:", err);
      setError("Failed to initiate transaction. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold tracking-wide text-gray-100">Initialize Stream</h3>
        <p className="text-sm text-gray-400 mt-1">Deploy a new payment stream on the Stacks blockchain.</p>
      </div>

      <form onSubmit={handleCreate} className="space-y-5">
        
        {/* Recipient Address Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider pl-1">Recipient Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiUser className="text-gray-500" />
            </div>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="SP3FBR..."
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl py-3 pl-11 pr-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Duration Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider pl-1">Duration (Blocks)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiClock className="text-gray-500" />
              </div>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 144"
                min="1"
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl py-3 pl-11 pr-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider pl-1">Total Amount (STX)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiDollarSign className="text-gray-500" />
              </div>
              <input
                type="number"
                step="0.000001" // Support micro-STX precision in the UI
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="0.000001"
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl py-3 pl-11 pr-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <p className="text-red-400 text-sm pl-1">{error}</p>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 relative flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="animate-spin text-lg" />
              <span>Awaiting Wallet Approval...</span>
            </>
          ) : (
            <>
              <FiSend className="text-lg" />
              <span>Create Stream</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
