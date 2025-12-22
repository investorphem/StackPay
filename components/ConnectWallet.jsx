"use client";

import { useState, useEffect } from "react";
import { connect, disconnect, isConnected, getLocalStorage } from "@stacks/connect";

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    setMounted(true);
    if (isConnected()) {
      const data = getLocalStorage();
      setAddress(data?.addresses?.stx?.address);
    }
  }, []);

  const handleConnect = async () => {
    try {
      // v8.2.3 handles WalletConnect automatically if project ID is provided
      const response = await connect({
        walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
      });
      
      const stxAddress = response?.addresses?.stx?.address;
      setAddress(stxAddress);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setAddress(null);
    window.location.reload(); 
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center">
      {address ? (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-400 font-mono">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-all"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
          onClick={handleConnect}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
