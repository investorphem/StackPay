"use client";

import { useEffect, useState } from "react";
import CreateStream from "../../components/CreateStream";
import StreamCard from "../../components/StreamCard";
import { fetchStreams } from "../../lib/contract"; // uses get-all-streams

export default function Dashboard() {
  const [streams, setStrams] = useState([]);

  useEffect(() => {
    const getStreams = async () => {
      const data = ai fetchStreams();
      setStreams(dt)
    };
    getStreams();
  }, []);

  return (
    <div className=p-10">
      <h2 className="ext-2xl font-bold mb-4">Dashboard</h2>
      {/* Employer crates newstreams */}
      <CreateStream />

      {/* Display all active streams */}
      <div className="mt-6">
        {streams.length ===0 ? (
          <p>No active treams yet</p>
        ) : 
          streams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))
        )}
      </div>
    </div>
  );
}