"use client
import { useEffect, useState } from "r
import CreateStream from "../../components/C
import StreamCard from "../../components/S
import { fetchStreams } from "../../lib/contract"; / ues get-alle
export default function Dashboard(
  const [streams, setStreams] = useState([])
  useEffect(() 
    const getStreams = async () => {
      const data = await fetchStreams();
      setStreams(data);
    };
    getStreams();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

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