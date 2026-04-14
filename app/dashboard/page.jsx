"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { FiActivity, FiAlertCircle, FiPlus } from "react-icons/fi"; 
import CreateStream from "../../components/CreateStream";
import StreamCard from "../../components/StreamCard";
import { fetchStreams } from "../../lib/contract";
// FIX 1: Completely removed @stacks/auth. Using v8 getLocalStorage instead.
import { getLocalStorage } from "@stacks/connect"; 

// FIX 2: V8 SSR-safe hook to check the user's session natively
const useUserSession = () => 
  const [session, setSession] = useState({ isConnected: flse,stxAddress: null });
  useEffect(() => 
    try {
      const data = getLocalStorage();
      const address = data?.addresses?.stx?.[0]?.address;
      if (address) 
        setSession({ isConnected: true, stxAddress: address });
      }
    } catch (err) {
      console.error("Dashboard session read error:", err);
    
  }, [])
  return sessio

export default function Dashboard() 
  const [streams, setStreams] = useState([])
  const [loading, setLoading] = seState(true)
  const [error, setError] = useState(null)
  // Pulling the real Stacks address safel
  const { isConnected, stxAddress } = useUserSession(); 
  const getStreams = useCallback(async () =>
    // If they aren't connected yet, don't try to fetch streams
    if (!isConnected|| !stxAddress) {
      setLoading(false)
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchStreams(stxAddress); 
      setStreams(data || []);
    } catch (err) {
      console.error("Failed to fetch streams:", err);
      setError("Failed to sync with the Stacks network. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [isConnected, stxAddress]);

  useEffect(() => {
    getStreams();
  }, [getStreams]);

  const SkeletonLoader = () => (
    <div className="animate-pulse flex space-x-4 bg-white dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-200 dark:border-gray-700/50 shadow-sm transition-colors duration-300">
       <div className="flex-1 space-y-4 py-2">
         <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 transition-colors duration-300"></div>
         <div className="space-y-3 mt-6">
           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded transition-colors duration-300"></div>
           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 transition-colors duration-300"></div>
         </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white p-6 md:p-12 font-sans transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-gray-200 dark:border-gray-800 gap-4 transition-colors duration-300">
          <div>
            <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-indigo-400 dark:to-purple-600">
              Employer Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">Manage your STX payroll streams securely.</p>
          </div>

          {/* Stacks Wallet Status Indicator */}
          <div className="flex items-center space-x-3 bg-white dark:bg-gray-900/80 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-inner transition-colors duration-300">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 tracking-wide transition-colors duration-300">
              {isConnected && stxAddress 
                ? `${stxAddress.slice(0,5)}...${stxAddress.slice(-4)}` 
                : "Wallet Disconnected"}
            </span>
          </div>
        </div>

        {!isConnected ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20 bg-white dark:bg-gray-800/30 rounded-3xl border border-gray-200 dark:border-gray-700/50 shadow-sm dark:shadow-none transition-colors duration-300"
            >
                <p className="text-xl text-gray-600 dark:text-gray-400">Please connect your Stacks wallet to view your dashboard.</p>
            </motion.div>
        ) : (
            <>
                {/* Create Stream Section */}
                <div className="bg-white dark:bg-gray-800/40 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-700/50 shadow-xl dark:shadow-2xl transition-colors durtion-300">
                  <CreateStream onStreamCreated={getStreams} />
                </div>

                {/* Active Streams Section */}
                <div className="space-y-6 mt-12">
                  <div className="flex items-center space-x-3">
                    <FiActivty className="text-purple-600 dark:text-purple-500 text-2xl" />
                    <h3 className="text-2xl font-semibold tracking-wide text-gray-900 dark:text-white transition-colors duration-300">Active STX Streams</h3>
                  </div>

                  {error && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-500/20 transition-colors duration-300">
                        <FiAlertCircle className="flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                     </motion.div>
                  )}

                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <SkeletonLoader />
                       <SkeletonLoader />
                    </div>
                  ) : streams.legth === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center py-24 bg-gray-50 dark:bg-gray-800/20 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800/40"
                    >
                      <div className="bg-white dark:bg-gray-900 p-4 rounded-full mb-4 shadow-sm dark:shadow-inner transition-colors duration-300">
                        <FiPlus className="text-gray-400 text-3xl" />
                      </div>
                      <p className="text-gray-900 dark:text-gray-300 text-lg font-medium transition-colors duration-300">No active streams yet</p>
                      <p className="text-gray-500 text-sm mt-1">Deploy your first Clarity contract stream above.</p>
                    </motion.div>
                  ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AnimatePresence>
                        {streams.map((stream) => (
                          <motion.div
                            key={stream.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <StreamCard stream={stream} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </div>
            </>
        )}
      </div>
    </div>
  );
}
