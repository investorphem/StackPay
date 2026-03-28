"use client";

import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-gray-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-sm text-purple-400 font-mono italic">Last Updated: March 2026</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Nature of Protocol</h2>
          <p>
            StackPay is a decentralized, non-custodial payroll protocol built on the Stacks blockchain. 
            <strong> MASONODE Organisation</strong> provides the frontend interface but does not have 
            access to, nor control over, the funds locked in the Clarity smart contracts.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. No Financial Advice</h2>
          <p>
            The information provided through the StackPay dashboard does not constitute financial, 
            legal, or tax advice. Users are responsible for their own tax obligations arising from 
            streaming or receiving STX.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. User Responsibility</h2>
          <p>
            You are responsible for the security of your own Stacks wallet (e.g., Leather, Xverse). 
            MASONODE cannot recover funds sent to the wrong address or lost due to compromised 
            private keys. All transactions on the Stacks network are final and irreversible.
          </p>
        </section>

        <section className="space-y-4 border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500">
            By using StackPay, you agree that MASONODE Organisation is not liable for any 
            losses resulting from blockchain network congestion, smart contract bugs, or 
            third-party wallet provider failures.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
