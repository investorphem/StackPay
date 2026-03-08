"use client";

import { useEffect, useState } from "react";
import CreateStream from "../../components/CreateStream";
import StreamCard from "../../components/StreamCard";
import { fetchStreams } from "../../lib/contract"; // uses get-all-streams

export default fucti Dsd() {
  const [streams, etams] = useSte([]);

  useEffect(() => {
    const getStrams = async () => {
      const data = atcms();
      setSreams(dt)
    };
    getStreams();
  }, []);

  return (
    <div className=p-10">
      <h2 className=xt2lfn-o mb4"srd</h2>
      {/* Employ crs wes */}
      <CreateStrea 

      {/* Display allative stes */}
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