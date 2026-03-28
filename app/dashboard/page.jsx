"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { FiActivity, FiAlertCircle, FiPlus } from "react-icons/fi"; 
import CreateStream from "../../components/CreateStream";
import StreamCard from "../../components/StreamCard";
import { fetchStreams } from "../../lib/contract";

// Assuming you are using a standard Stacks connect hook here, or pulling from local storage
// like we did in the ConnectWallet component. Mocking the state for the layout:
const useUserSession = () => {
  return {
    isConnected: true, // Replace with actual connection check
    stxAddress: "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE" // Replace with actual user address
  };
};

export default function Dashboard() {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pulling the user's Stacks address to filter their specific streams
  const { isConnected, stxAddress } = useUserSession(); 

  const getStreams = useCallback(async () => {
    if (!isConnected) return; 
    
    try {
      setLoading(true);
      setError(null);
      // Fetching streams specifically for this Stacks Principal using our upgraded lib function
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
    <div className="animate-pulse flex space-x-4 bg-gray-800/50 p-6 rounded-3xl border border-gray-700/50 shadow-sm">
       <div className="flex-1 space-y-4 py-2">
         <div className="h-5 bg-gray-700 rounded w-1/3"></div>
         <div className="space-y-3 mt-6">
           <div className="h-4 bg-gray-700 rounded"></div>
           <div className="h-4 bg-gray-700 rounded w-5/6"></div>
         </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-gray-800 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
              Stackpay
            </h2>
            <p className="text-gray-400 mt-2">Manage your STX payroll streams securely.</p>
          </div>
          
          {/* Stacks Wallet Status Indicator */}
          <div className="flex items-center space-x-3 bg-gray-900/80 px-4 py-2 rounded-full border border-gray-700 shadow-inner">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium text-gray-300 tracking-wide">
              {isConnected && stxAddress 
                ? `${stxAddress.slice(0,5)}...${stxAddress.slice(-4)}` 
                : "Wallet Disconnected"}
            </span>
          </div>
        </div>

        {!isConnected ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20 bg-gray-800/30 rounded-3xl border border-gray-700/50 backdrop-blur-md"
            >
                <p className="text-xl text-gray-400">Please connect your Stacks wallet to view your dashboard.</p>
            </motion.div>
        ) : (
            <>
                {/* Create Stream Section */}
                <div className="bg-gray-800/40 rounded-3xl p-6 md:p-8 border border-gray-700/50 backdrop-blur-md shadow-2xl">
                  <CreateStream onStreamCreated={getStreams} />
                </div>

                {/* Active Streams Section */}
                <div className="space-y-6 mt-12">
                  <div className="flex items-center space-x-3">
                    <FiActivity className="text-purple-500 text-2xl" />
                    <h3 className="text-2xl font-semibold tracking-wide">Active STX Streams</h3>
                  </div>
                  
                  {error && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-3 bg-red-500/10 text-red-400 p-4 rounded-xl border border-red-500/20">
                        <FiAlertCircle className="flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                     </motion.div>
                  )}

                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <SkeletonLoader />
                       <SkeletonLoader />
                    </div>
                  ) : streams.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center py-24 bg-gray-800/20 rounded-3xl border border-dashed border-gray-700 transition-colors hover:bg-gray-800/40"
                    >
                      <div className="bg-gray-900 p-4 rounded-full mb-4 shadow-inner">
                        <FiPlus className="text-gray-400 text-3xl" />
                      </div>
                      <p className="text-gray-300 text-lg font-medium">No active streams yet</p>
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
