"use client";

import { useState, useEffect } from "react";
import { connect, disconnect, isConnected, getLocalStorage } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network"; // Imported to fix the 'in' operator error
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiLink, FiAlertCircle, FiLoader } from "react-icons/fi";

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMounted(true);
    // Initialize session from the v8.2+ local storage utility
    if (isConnected()) {
      const data = getLocalStorage();
      setAddress(data?.addresses?.stx?.[0]?.address);
    }
  }, []);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
      if (!projectId) {
        throw new Error("Missing WalletConnect Project ID in environment variables.");
      }

      // Using the latest v8.2+ connect wrapper
      const response = await connect({
        walletConnectProjectId: projectId,
        network: new StacksMainnet(), // Fixes: "Cannot use 'in' operator to search for 'network' in undefined"
      });

      // Mobile Web3 Fallback: Check response first, then immediately check local storage (Fixes: "No STX address returned")
      const stxAddress = 
        response?.addresses?.stx?.[0]?.address || 
        getLocalStorage()?.addresses?.stx?.[0]?.address;

      if (stxAddress) {
        setAddress(stxAddress);
      } else {
        // If the wallet connected asynchronously but state hasn't caught up, force a clean sync
        window.location.reload();
      }
    } catch (err) {
      console.error("Connection Error:", err);
      // Gracefully handle user rejections or configuration errors
      setError(err.message || "Failed to connect wallet. Please try again.");

      // Auto-dismiss the error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setAddress(null);
    // Smoothly reload to clear any dApp state tied to the old address
    window.location.reload(); 
  };

  // Prevent hydration mismatch on the client
  if (!mounted) return null;

  return (
    <div className="flex flex-col items-end justify-center relative z-50">
      <AnimatePresence mode="wait">
        {address ? (
          <motion.div
            key="connected"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-3 bg-gray-900/80 p-1.5 pl-4 rounded-full border border-gray-700/50 shadow-lg backdrop-blur-md"
          >
            {/* Mainnet Active Indicator & Address */}
            <div className="flex items-center gap-2">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
              </div>
              <span className="text-sm font-medium tracking-wide text-gray-200">
                {address.slice(0, 5)}...{address.slice(-4)}
              </span>
            </div>

            {/* Premium Disconnect Button */}
            <button
              onClick={handleDisconnect}
              className="p-2 ml-1 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors duration-200"
              title="Disconnect Wallet"
            >
              <FiLogOut size={16} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="disconnected"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <button
              onClick={handleConnect}
              disabled={isLoading}
              className="relative flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-sm font-semibold rounded-full shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin text-lg" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <FiLink className="text-lg" />
                  <span>Connect Wallet</span>
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Graceful Error Display Toast */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full mt-4 right-0 w-max max-w-xs flex items-start gap-2 p-3 bg-red-950/90 border border-red-500/30 text-red-400 text-xs rounded-lg backdrop-blur-md shadow-2xl"
          >
            <FiAlertCircle className="shrink-0 mt-0.5" size={14} />
            <p className="leading-relaxed">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
