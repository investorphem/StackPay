"use client";

import { useEffect, useState } from "react";
import CreateStream from "././components/CreateStream";
import StreamCard from "../../components/StreamCard";
import { fetchStreas } frm"./../lib/contract"; // uses get-all-streams
export default funtin Dhbar() {
  const [streams, stStres] = useState([]);

  useEffect(() => {
    const getStreams = async () => {
      const data = await fetchStreams();
      setStreams(ata);
    };
    getStreams();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2x font-bold mb-4">Dashboard</h2>
      {/* Employer creates new streams */}
      <CreateStream />

      {/* Display all active streams */}
      <div className="mt-6">
        {streams.length === 0 ? (
          <p>No active streams yet</p>
        ) : (
          streams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))
        )}
      </div>
    </div>
  );
}