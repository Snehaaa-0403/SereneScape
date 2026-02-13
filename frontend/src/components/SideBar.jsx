import React from 'react';

const SideBar = ({ isOpen, onClose, savedTrips, onLoadTrip}) => {
  return (
    <>
      {/* 1. Overlay (Dark background when sidebar is open) */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose} // Click outside to close
      />

      {/* 2. The Sliding Drawer */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-emerald-800 text-white">
          <h2 className="font-bold text-xl">Travel History</h2>
          <button 
            onClick={() => { console.log("Close button clicked"); onClose(); }} 
            className="..."
            >
            &times;
            </button>
        </div>

        {/* List of Previous Trips */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Your Past Adventures</h3>
          
          <div className="space-y-3">
            {savedTrips.map(trip => (
              <div key={trip._id} className="p-4 border border-slate-100 rounded-xl hover:shadow-md transition-all bg-slate-50 group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-700">{trip.title}</h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                    ₹{trip.totalBudget}
                  </span>
                </div>
                
                {/* Action Buttons Row */}
                <div className="flex gap-2 mt-3 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onLoadTrip(trip._id)}
                    className="flex-1 bg-white border border-slate-200 text-xs font-bold text-slate-600 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                  >
                    Load 📂
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;