"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiShield, FiZap, FiCpu } from "react-icons/fi";
import Link from "next/link";
import ConnectWallet from "../components/ConnectWallet";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 transition-colors duration-300">

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 dar:bg-purple-600/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-300" 

      <div className="max-w-4xl w-full text-center z-10">
        {/* Animated Badge */
        <motion.dil
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }
          className="inline-flex items-center gap-2 px-3 py1 rounde-full bg-purple-100 dark:bg-purple-500/10 border borderpupl-200 dark:border-purple-500/20 mb-8 transition-colors duraton-00"
       
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 dark:bg-purple-400 opacity-75"></span
            <span className="relative inline-flex rounded-full h-w-2 bg-purple-600 dark:bg-purple-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-700 dak:xt-purple-400 transition-colors duration-300">
            Live on Stacks Mainnet
          </span
        </motion.div
        {/* Hero Title */}
        <motion.h
          initial={{ opacity: 0, y: 20 }
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 dark:text-white mb-6 transition-colors duration-300"
        >
          Real-Time Payroll <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 dark:from-purple-400 dark:via-indigo-400 dark:to-purple-600 transition-all duration-300">
            Secured by Bitcoin
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-colors duration-300"
        >
          StackPay enables trustless salary streaming and automated recurring payments 
          on the Stacks blockchain. Pay your team every block.
        </motion.p>

        {/* Call to Action Group */}
        <motion.di
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* scale-110 makes the connect button pop on the landing page */}
          <div className="scale-110">
            <ConnectWallet />
          </div>

          <Link href="/dashboard">
            <button className="flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white shadow-sm dark:shadow-none font-semibold rounded-full transition-all duration-300">
              Enter Dashboard <FiArrowRight />
            </button>
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left border-t border-gray-200 dark:border-gray-900 pt-12 transition-colors duration-300"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center border border-gray-200 dark:border-gray-800 transition-colors duration-300">
              <FiZap className="text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white transition-colors duration-300">Instant Streaming</h4>
            <p className="text-sm text-gray-600 dark:text-gray-500 leading-relaxed transition-colors duration-300">Funds settle automatically on-chain with every Stacks block confirmation.</p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center border border-gray-200 dark:border-gray-800 transition-colors duration-300">
              <FiShield className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white transition-colors duration-300">Trustless Escrow</h4
            <p className="text-sm text-gray-600 darktext-gray-500 leading-relaxed transition-colors duration-300">Clarity smart contracts ensure employers and employees are always protected.</p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center border border-gray-200 darkborder-gray-800 transition-colors duration-300">
              <FiCpu className="text-emerald-600 dark:txt-emerald-400" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white transition-colors duration-300">Bitcoin Security</h4>
            <p className="text-sm text-gray-600 dark:text-gray-500 leading-relaxed transition-colors duration-300">Leverages the Stacks PoX consensus to inherit the security of the Bitcoin network.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
