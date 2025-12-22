"use client";

import { showConnect } from "@stacks/connect";

export default function ConnectWallet() {
  return (
    <button
      className="mt-6 px-4 py-2 bg-blue-600 rounded"
      onClick={() =>
        showConnect({
          appDetails: {
            name: "StackPay",
            icon: "/logo.png",
          },
        })
      }
    >
      Connect Wallet
    </button>
  );
}