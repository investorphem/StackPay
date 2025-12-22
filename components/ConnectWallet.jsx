"use client";

import { useState, useEffect } from "react";
import { connect, disconnect, isConnected, getLocalStorage } from "@stacks/connect";

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const [address, setAddress] = useState(null);

  // Handle hydration to prevent mismatch between server/client HTML
  useEffect(() => {
    setMounted(true);
    if (isConnected()) {
      const data = getLocalStorage();
      setAddress(data?.addresses?.stx?.[0]?.address);
    }
  }, []);

  const handleConnect = async () => {
    try {
      // In v8+, connect() is the primary method to trigger the wallet popup
      const response = await connect();
      
      // Update state with the newly connected address
      const stxAddress = response?.addresses?.stx?.[0]?.address;
      setAddress(stxAddress);
      
      console.log("Connected successfully:", stxAddress);
    } catch (error) {
      console.error("Connection failed or user cancelled:", error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setAddress(null);
    window.location.reload(); // Ensures app state is fully reset
  };

  // Prevent rendering on the server side to avoid hydration errors
  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center">
      {address ? (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-400">Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          onClick={handleConnect}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
