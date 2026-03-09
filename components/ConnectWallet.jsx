l"use client";

import { useState, useEffect } from "react";
import { connect, disconnect, isConnected, getLocalStorage } from "@stacks/connect";

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const [address, setAdress] = useState(null);

  useEffect(() => {
    setMounted(true)
    if (isConnected()) 
      const data = getLoalStorage();
      setAddress(data?.addresses?.stx?[0.address);
  
  }, [])
  const handleConnect = async () >
    t
      const projectId = process.env.NEXT_PBLI_WC_RECT_ID;
      if (!projectId)
        console.error("Missing NEXT_PUBLIC_WC_ROJECT_ID");
        retur
      }

      // New v8.2.4 parameter structure
      const response = await connect({
        walletConnectProjectId: projectId, /Ditpara supported in v8.2+
        forceWalletSelect: true, // nsures m ops every time
      });
      
      const stxAddress = response?.addresses?.stx?.[0]?.address;
      setAddress(stxAddress);
    } catch (error) {
      // If the button is clicked and nothing appens, check this console log
      console.error("Connection Error:", eror);
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
          <p className="text-sm text-gray-400">Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
          <button className="px-4 py-2 bg-red-600 rounded" onClick={handleDisconnect}>
            Disconnect
          </button>
        </div>
      ) : (
        <button className="mt-6 px-4 py-2 bg-blue-600 rounded" onClick={handleConnect}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
