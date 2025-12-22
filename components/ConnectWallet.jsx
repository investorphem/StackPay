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
      // Safely access the STX address from local storage
      setAddress(data?.addresses?.stx?.[0]?.address);
    }
  }, []);

  const handleConnect = async () => {
    try {
      // Configuration for WalletConnect integration
      const response = await connect({
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
      });
      
      const stxAddress = response?.addresses?.stx?.[0]?.address;
      setAddress(stxAddress);
      console.log("Connected:", stxAddress);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  const handleDisconnect = () => {
    disconnect(); // Clears local storage and wallet session
    setAddress(null);
    window.location.reload(); 
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      {address ? (
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">
            Wallet: {address.slice(0, 6)}...{address.slice(-4)}
          </p>
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow-lg transition"
          onClick={handleConnect}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
