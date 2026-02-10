import React from 'react';

const ItineraryList = ({ selectedIds, allSpots }) => {
  // 1. Filter the master list to find only the selected spots
  const savedSpots = allSpots.filter(spot => selectedIds.includes(spot._id));

  if (savedSpots.length === 0) {
    return <p className="text-slate-400 italic text-sm">Your itinerary is empty. Add some peace!</p>;
  }

  return (
    <div className="space-y-3">
      {savedSpots.map((spot) => (
        <div key={spot._id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div>
            <p className="font-medium text-slate-800">{spot.name}</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">{spot.location}</p>
          </div>
          <p className="text-emerald-700 font-bold">₹{spot.avgDailyCost}</p>
        </div>
      ))}
    </div>
  );
};

export default ItineraryList;