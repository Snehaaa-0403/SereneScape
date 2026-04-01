import React,{useState} from 'react';

const SereneCard = ({ spot, onAddToTrip }) => {
  const [day, setDay] = useState(1);
  return (
    <div className="max-w-sm bg-[#F9FBFA] rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
      <div className="relative h-56">
        <img className="w-full h-full object-cover" src={spot.imageUrl} alt={spot.name} />
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-800">
          Score: {spot.serenityScore}/10
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-slate-800">{spot.name}</h2>
          <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">₹{spot.avgDailyCost}/day</span>
        </div>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{spot.description}</p>

        {/* Day Selector UI */}
        <div className="flex items-center gap-2 mb-4">
          <label className="text-xs font-bold text-slate-400 uppercase">Day:</label>
          <select 
            value={day} 
            onChange={(e) => setDay(Number(e.target.value))}
            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-sm outline-none cursor-pointer"
          >
            {[1,2,3,4,5,6,7].map(d => <option key={d} value={d}>Day {d}</option>)}
          </select>
        </div>

        <button 
          onClick={() => onAddToTrip(spot._id, day)} // Pass Day to App.jsx
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-3 rounded-2xl transition-colors"
        >
          Add to Itinerary
        </button>
      </div>
    </div>
  );
};

export default SereneCard;