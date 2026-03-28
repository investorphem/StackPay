"use client";

import { useState, useEffect } from "react";
import { showConnect } from "@stacks/connect"; 
import { AppConfig, UserSession } from "@stacks/auth"; 
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiLink, FiAlertCircle, FiLoader } from "react-icons/fi";

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // FIX 1: Hold the userSession in state instead of a global export
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    setMounted(true);
    
    // FIX 2: Initialize UserSession ONLY inside useEffect. 
    // This completely eliminates the "Application Error" crash during Next.js SSR.
    const appConfig = new AppConfig(["store_write", "publish_data"]);
    const session = new UserSession({ appConfig });
    setUserSession(session);

    if (session.isSignInPending()) {
      session.handlePendingSignIn().then((userData) => {
        setAddress(userData.profile.stxAddress.mainnet);
      });
    } else if (session.isUserSignedIn()) {
      const userData = session.loadUserData();
      setAddress(userData.profile.stxAddress.mainnet);
    }
  }, []);

  const handleConnect = () => {
    setIsLoading(true);
    setError(null);

    // Safety check: ensure session is ready
    if (!userSession) {
      setError("Wallet system initializing. Please refresh and try again.");
      setIsLoading(false);
      return;
    }

    // FIX 3: Detect if Leather/Xverse is actually installed to prevent infinite spinning
    if (typeof window !== "undefined" && !window.StacksProvider && !window.LeatherProvider) {
      setError("No Stacks wallet detected. Please install Leather or Xverse extension.");
      setIsLoading(false);
      return;
    }

    // Trigger the classic, crash-free Leather auth flow (Avoids Zod Error)
    showConnect({
      appDetails: {
        name: "StackPay Protocol",
        icon: "https://stackpay-one.vercel.app/apple-touch-icon.png",
      },
      userSession,
      onFinish: () => {
        setIsLoading(false);
        window.location.reload(); // Clean sync once connected
      },
      onCancel: () => {
        setIsLoading(false);
        setError("Connection request cancelled.");
        setTimeout(() => setError(null), 5000);
      }
    });
  };

  const handleDisconnect = () => {
    if (userSession) {
      userSession.signUserOut(); 
    }
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
