import React from 'react';

const ItineraryList = ({ selectedIds, onDelete}) => {
  // selectedIds is actually the full array of objects now: [{spot: {...}, day: 1}, ...]
  
  // 1. Get unique days and sort them
  const days = [...new Set(selectedIds.map(item => item.day))].sort((a, b) => a - b);

  if (selectedIds.length === 0) {
    return <p className="text-slate-400 italic text-sm">Your itinerary is empty.</p>;
  }

  return (
    <div className="space-y-4">
      {days.map(day => (
        <div key={day}>
          {/* Day Header */}
          <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2 border-b border-emerald-100 pb-1">
            Day {day}
          </h4>
          
          {/* Filter spots for this specific day */}
          <div className="space-y-2">
            {selectedIds
              .filter(item => item.day === day)
              .map((item) => (
                <div key={item._id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{item.spot.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase">{item.spot.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">₹{item.spot.avgDailyCost}</span>
                    
                    {/* The Delete Button */}
                    <button 
                        onClick={() => onDelete(item.spot._id)}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                        title="Remove from plan"
                    >
                        ✕
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryList;