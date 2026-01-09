"use client";

import { useEffect, useState } from "react";
import CreateStream from "../../components/CreateStream";
import StreamCard from "../../components/StreamCard";
import StreamAnalytics from "../../components/StreamAnalytics";
import Toast from "../../components/Toast";
import { fetchStreams, getCurrentBlockHeight } from "../../lib/contract";
import { getLocalStorage } from "@stacks/connect";
import { useToast } from "../../hooks/useToast";

export default function Dashboard() {
  const [streams, setStreams] = useState([]);
  const [filteredStreams, setFilteredStreams] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [filter, setFilter] = useState("all"); // all, employer, employee
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    // Get connected wallet address
    const data = getLocalStorage();
    const address = data?.addresses?.stx?.[0]?.address;
    setCurrentAddress(address);

    // Fetch initial data
    loadData();

    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Apply filter
    if (!currentAddress) {
      setFilteredStreams(streams);
      return;
    }

    switch (filter) {
      case "employer":
        setFilteredStreams(streams.filter(s => s.employer === currentAddress));
        break;
      case "employee":
        setFilteredStreams(streams.filter(s => s.employee === currentAddress));
        break;
      default:
        setFilteredStreams(streams);
    }
  }, [filter, streams, currentAddress]);

  const loadData = async () => {
    const [streamsData, blockHeight] = await Promise.all([
      fetchStreams(),
      getCurrentBlockHeight()
    ]);
    
    setStreams(streamsData);
    setCurrentBlock(blockHeight);
  };

  const handleSuccess = (message) => {
    showToast(message, "success");
    setTimeout(loadData, 2000);
  };

  const handleError = (message) => {
    showToast(message, "error");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6 md:p-10">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              StackPay Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Block Height: <span className="font-mono text-blue-400">#{currentBlock}</span>
            </p>
          </div>
          
          {currentAddress && (
            <div className="text-right">
              <p className="text-xs text-gray-400">Connected Wallet</p>
              <p className="font-mono text-sm">{currentAddress.slice(0, 8)}...{currentAddress.slice(-6)}</p>
            </div>
          )}
        </div>

        {/* Analytics */}
        {currentAddress && (
          <StreamAnalytics streams={streams} currentAddress={currentAddress} />
        )}

        {/* Create Stream */}
        <div className="mb-8">
          <CreateStream onSuccess={handleSuccess} onError={handleError} />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-700 pb-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-t transition ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
            }`}
          >
            All Streams ({streams.length})
          </button>
          <button
            onClick={() => setFilter("employer")}
            className={`px-4 py-2 rounded-t transition ${
              filter === "employer"
                ? "bg-purple-600 text-white"
                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
            }`}
          >
            As Employer ({streams.filter(s => s.employer === currentAddress).length})
          </button>
          <button
            onClick={() => setFilter("employee")}
            className={`px-4 py-2 rounded-t transition ${
              filter === "employee"
                ? "bg-cyan-600 text-white"
                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
            }`}
          >
            As Employee ({streams.filter(s => s.employee === currentAddress).length})
          </button>
        </div>

        {/* Display streams */}
        <div>
          {filteredStreams.length === 0 ? (
            <div className="bg-slate-800 p-10 rounded-lg text-center border-2 border-dashed border-slate-700">
              <p className="text-gray-400 text-lg">No streams found</p>
              <p className="text-gray-500 text-sm mt-2">
                {filter === "all" 
                  ? "Create your first salary stream to get started!" 
                  : `No streams where you are ${filter === "employer" ? "an employer" : "an employee"}`}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredStreams.map((stream) => (
                <StreamCard
                  key={stream.id}
                  stream={stream}
                  currentAddress={currentAddress}
                  currentBlock={currentBlock}
                  onSuccess={handleSuccess}
                  onError={handleError}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}