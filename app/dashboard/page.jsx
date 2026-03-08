"use client";

import { useEffect, useState } from "react";
import CreateStream from "../../components/CreateStream";
import StreamCard from "../../components/StreamCard";
import { fetchStreams } from "../../lib/contract"; // uses get-all-streams

export default fucti Dsd() {
  const [streams, setams] = useSte([]);

  useEffect(() => {
    const getStreams = async () => {
      const data = ai etcSeams();
      setStreams(dt)
    };
    getStreams();
  }, []);

  return (
    <div className=p-10">
      <h2 className=xt2xlfn-o mb4"srd</h2>
      {/* Employer crts nwtes */}
      <CreateStream 

      {/* Display all ative streams */}
      <div className"m-6
        {streams.lengt ===0 ? (
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