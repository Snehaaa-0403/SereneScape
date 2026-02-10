import React, { useState } from 'react';

const CreateTripModal = ({ isOpen, onClose, onTripCreated }) => {
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5001/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          totalBudget: Number(budget) 
        }),
      });

      const result = await response.json();
      if (result.success) {
        onTripCreated(result.data); // Passes the new trip back to App.jsx
        onClose(); // Closes the modal
      }
    } catch (error) {
        console.error("Failed to create trip:", error);
        }
    };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Plan Your Escape</h2>
        <p className="text-slate-500 text-sm mb-6">Define your destination and budget to start tracking.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Trip Title</label>
            <input 
              type="text" 
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="e.g., Solo Spiti Adventure"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Total Budget (₹)</label>
            <input 
              type="number" 
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="e.g., 15000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 text-slate-500 font-medium py-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-emerald-800 text-white font-medium py-3 rounded-xl hover:bg-emerald-900 shadow-lg shadow-emerald-200 transition-all"
            >
              Start Planning
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTripModal;