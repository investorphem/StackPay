"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-gray-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-sm text-purple-400 font-mono italic">Last Updated: March 2026</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Data Collection</h2>
          <p>
            MASONODE Organisation does not collect, store, or sell any personal identifying 
            information (PII). We do not use cookies to track your personal identity.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. Blockchain Data</h2>
          <p>
            Please be aware that your Stacks wallet address and all payroll transaction history 
            (including streams created and withdrawals made) are public records on the Stacks 
            blockchain. This data is not controlled by MASONODE and cannot be deleted.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">3. Third-Party Services</h2>
          <p>
            Our dApp uses <strong>WalletConnect</strong> and <strong>Hiro/Leather RPC nodes</strong> 
            to communicate with the blockchain. These services may log technical data such as 
            IP addresses in accordance with their own privacy policies.
          </p>
        </section>

        <section className="space-y-4 border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500">
            For support inquiries, you may contact us via our official MASONODE organization channels. 
            Any information provided during support will be used solely to resolve your issue.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
