"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiClock, FiZap, FiAlertCircle } from "react-icons/fi";
import { isConnected, getLocalStorage } from "@stacks/connect";
import { fetchStreams } from "../../lib/contract";
import StreamCard from "../../components/StreamCard";

export default function EmployeeDashboard() {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAddress, setUserAddress] = useState(null);

  // 1. Initial Identity Check
  useEffect(() => {
    if (isConnected()) {
      const data = getLocalStorage();
      setUserAddress(data?.addresses?.stx?.[0]?.address);
    }
    setLoading(false);
  }, []);

  // 2. Optimized Stream Fetching
  const loadEmployeeStreams = useCallback(async () => {
    if (!userAddress) return;
    try {
      setLoading(true);
      // Fetches and filters for streams where user is the EMPLOYEE
      const allStreams = await fetchStreams(userAddress);
      const employeeOnly = allStreams.filter(s => s.employee === userAddress);
      setStreams(employeeOnly);
    } catch (err) {
      console.error("Failed to load employee streams:", err);
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  useEffect(() => {
    loadEmployeeStreams();
  }, [loadEmployeeStreams]);

  // Loading State
  if (loading && !userAddress) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Employee Dashboard</h1>
            <p className="text-gray-400 mt-2">Claim your accrued STX from active payroll streams.</p>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 px-6 py-3 rounded-2xl backdrop-blur-md">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-1">Your Earnings Address</span>
            <span className="text-purple-400 font-mono text-sm">
              {userAddress ? `${userAddress.slice(0, 8)}...${userAddress.slice(-6)}` : "Not Connected"}
            </span>
          </div>
        </motion.div>
      </div>

      {!userAddress ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-gray-900/30 border border-dashed border-gray-800 rounded-3xl p-20 text-center"
        >
          <FiAlertCircle className="mx-auto text-4xl text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-300">Wallet Not Connected</h3>
          <p className="text-gray-500 mt-2">Please connect your Stacks wallet to view your payroll streams.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Streams List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <FiZap className="text-yellow-400" />
              <h2 className="text-xl font-bold text-white uppercase tracking-wider text-sm">Active Incoming Streams</h2>
            </div>

            {streams.length === 0 ? (
              <div className="bg-gray-900/20 rounded-3xl p-12 text-center border border-gray-900">
                <FiClock className="mx-auto text-3xl text-gray-700 mb-4" />
                <p className="text-gray-500">No active streams found for your address.</p>
              </div>
            ) : (
              <AnimatePresence>
                <div className="grid grid-cols-1 gap-6">
                  {streams.map((stream) => (
                    <motion.div 
                      key={stream.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <StreamCard stream={stream} isEmployeeView={true} onWithdraw={loadEmployeeStreams} />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>

          {/* Sidebar / Instructions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/20 rounded-3xl p-6 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FiDownload className="text-purple-400" /> How to Claim
              </h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3">
                  <span className="text-purple-500 font-bold">01.</span>
                  <span>Wait for Stacks blocks to confirm (approx. every 10 mins).</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-500 font-bold">02.</span>
                  <span>Your "Claimable" balance updates automatically as blocks pass.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-500 font-bold">03.</span>
                  <span>Click "Withdraw" to move the accrued STX directly to your wallet.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/40 border border-gray-800 rounded-3xl p-6">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Protocol Note</h4>
              <p className="text-[11px] leading-relaxed text-gray-500">
                All withdrawals are processed via Clarity Smart Contracts. MASONODE Organisation does not hold your funds. Fees for withdrawals are paid in STX and determined by the Stacks network.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
