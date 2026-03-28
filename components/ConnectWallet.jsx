"use client";

import { useState, useEffect } from "react";
// FIX 1: We use the v8 `connect` and `getLocalStorage` tools directly. No more showConnect!
import { connect, disconnect, getLocalStorage } from "@stacks/connect"; 
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiLink, FiAlertCircle, FiLoader } from "react-icons/fi";

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMounted(true);
    // FIX 2: SSR Safe LocalStorage Check for v8
    try {
      const data = getLocalStorage();
      const savedAddress = data?.addresses?.stx?.[0]?.address;
      if (savedAddress) setAddress(savedAddress);
    } catch (err) {
      console.error("Storage error:", err);
    }
  }, []);

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);

    // Extension Check: Prevents infinite spinning if the wallet isn't detected
    if (typeof window !== "undefined" && !window.StacksProvider && !window.LeatherProvider) {
      setError("No Stacks wallet detected. Please install Leather or Xverse.");
      setIsLoading(false);
      return;
    }

    try {
      const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "default_project_id";

      // FIX 3: V8 Native Connect
      const response = await connect({
        appDetails: {
          name: "StackPay Protocol",
          icon: "https://stackpay-one.vercel.app/apple-touch-icon.png",
        },
        // Correct v8 WalletConnect syntax
        walletConnect: { 
          projectId: projectId 
        }
        // Notice we REMOVED the `network` object completely. 
        // Passing the network object here is what triggers Leather's ZodError!
      });

      const stxAddress = response?.addresses?.stx?.[0]?.address || getLocalStorage()?.addresses?.stx?.[0]?.address;

      if (stxAddress) {
        setAddress(stxAddress);
        window.location.reload(); 
      } else {
        throw new Error("No address returned from wallet.");
      }
    } catch (err) {
      console.error("Connection Error:", err);
      setError(err.message || "Failed to connect wallet.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setAddress(null);
    window.location.reload(); 
  };

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
            className="flex items-center gap-3 bg-white dark:bg-gray-900/80 p-1.5 pl-4 rounded-full border border-gray-200 dark:border-gray-700/50 shadow-lg backdrop-blur-md transition-colors duration-300"
          >
            <div className="flex items-center gap-2">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
              </div>
              <span className="text-sm font-medium tracking-wide text-gray-900 dark:text-gray-200 transition-colors duration-300">
                {address.slice(0, 5)}...{address.slice(-4)}
              </span>
            </div>

            <button
              onClick={handleDisconnect}
              className="p-2 ml-1 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-500/10 rounded-full transition-colors duration-200"
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
              className="relative flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full mt-4 right-0 w-max max-w-xs flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/90 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-xs rounded-lg shadow-2xl transition-colors duration-300"
          >
            <FiAlertCircle className="shrink-0 mt-0.5" size={14} />
            <p className="leading-relaxed">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
