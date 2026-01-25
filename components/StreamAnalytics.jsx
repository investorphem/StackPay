"use client";

export default function StreamAnalytics({ streams, currentAddress }) {
  const activeStreams = streams.filter(s => s.active);
  
  const asEmployer = streams.filter(s => s.employer === currentAddress);
  const asEmployee = streams.filter(s => s.employee === currentAddress);
  
  const totalFundedByMe = asEmployer.reduce((sum, s) => sum + (s.balance || 0), 0);
  const totalEarnableByMe = asEmployee.reduce((sum, s) => sum + (s.balance || 0), 0);
  
  const avgRate = activeStreams.length > 0
    ? activeStreams.reduce((sum, s) => sum + (s.ratePerBlock || 0), 0) / activeStreams.length
    : 0;

  const formatSTX = (microSTX) => {
    return (microSTX / 1000000).toFixed(2);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-5 rounded-lg shadow-lg">
        <p className="text-sm text-blue-200">Total Streams</p>
        <p className="text-3xl font-bold mt-1">{streams.length}</p>
        <p className="text-xs text-blue-200 mt-1">{activeStreams.length} active</p>
      </div>
      
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-5 rounded-lg shadow-lg">
        <p className="text-sm text-purple-200">As Employer</p>
        <p className="text-3xl font-bold mt-1">{asEmployer.length}</p>
        <p className="text-xs text-purple-200 mt-1">{formatSTX(totalFundedByMe)} STX funded</p>
      </div>
      
      <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 p-5 rounded-lg shadow-lg">
        <p className="text-sm text-cyan-200">As Employee</p>
        <p className="text-3xl font-bold mt-1">{asEmployee.length}</p>
        <p className="text-xs text-cyan-200 mt-1">{formatSTX(totalEarnableByMe)} STX earnable</p>
      </div>
      
      <div className="bg-gradient-to-br from-green-600 to-green-800 p-5 rounded-lg shadow-lg">
        <p className="text-sm text-green-200">Avg Rate/Block</p>
        <p className="text-3xl font-bold mt-1">{formatSTX(avgRate)}</p>
        <p className="text-xs text-green-200 mt-1">STX per block</p>
      </div>
    </div>
  );
}
