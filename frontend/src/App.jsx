import { useState, useEffect } from 'react'
import SereneCard from './components/SereneCard'
import CreateTripModal from './components/CreateTripModel'
import ItineraryList from './components/ItenaryList'
import './App.css'

function App() {
  const [spots, setSpots] = useState([])
  const [currentTrip, setCurrentTrip] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // 1. Fetch Discovery Data on Load
  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/spots')
        const result = await response.json()
        if (result.success) setSpots(result.data)
      } catch (error) {
        console.error("Error fetching spots:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSpots()
  }, [])

  const handleResetTrip = () => {
    if (window.confirm("Are you sure you want to end this planning session? Your saved progress will remain in the database, but the dashboard will close.")) {
      setCurrentTrip(null);
    }
  };

  const handleTripCreated = (tripData) => {
    setCurrentTrip(tripData);
  }

  // 2. The Comprehensive Budget Guard
  const handleAddToTrip = async (spotId) => {
    if (!currentTrip) {
      alert("Please create a trip first using the '+ Plan My Trip' button!");
      setIsModalOpen(true);
      return;
    }

    // A. Identify the new spot being added
    const newSpot = spots.find(s => s._id === spotId);
    
    // B. Calculate existing costs from 'selectedSpots' array
    const existingSpotsCost = currentTrip.selectedSpots.reduce((total, id) => {
      const spotData = spots.find(s => s._id === id);
      return total + (spotData?.avgDailyCost || 0);
    }, 0);

    // C. Calculate current extra expenses (food, transport, etc.)
    const currentExpenses = currentTrip.expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0;
    
    // D. Final Comparison: Old Spots + Old Expenses + New Spot vs Budget
    const totalPotentialCost = existingSpotsCost + currentExpenses + newSpot.avgDailyCost;

    if (totalPotentialCost > currentTrip.totalBudget) {
      alert(`❌ BUDGET EXCEEDED!
            
      Existing Plans: ₹${existingSpotsCost + currentExpenses}
      New Spot (${newSpot.name}): ₹${newSpot.avgDailyCost}
      -----------------------------
      Total: ₹${totalPotentialCost}
      Your Limit: ₹${currentTrip.totalBudget}

      Please choose a more affordable spot or increase your budget!`);
            return; // STOP: Do not call the backend
          }

    try {
      const response = await fetch(`http://localhost:5001/api/trips/${currentTrip._id}/add-spot`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spotId }) 
      });

      const result = await response.json();

      if (result.success) {
        alert(`Successfully added ${newSpot.name} to your itinerary! 🏔️`);
        setCurrentTrip(result.data); // Update state with the new list of spots
      }
    } catch (error) {
      console.error("Error adding spot:", error);
      alert("Network error. Please check your backend connection.");
    }
  }

  // Helper function to calculate remaining budget for the UI
  const calculateRemaining = () => {
    if (!currentTrip) return 0;
    const spotsCost = currentTrip.selectedSpots.reduce((t, id) => {
      const s = spots.find(item => item._id === id);
      return t + (s?.avgDailyCost || 0);
    }, 0);
    const expCost = currentTrip.expenses?.reduce((sum, e) => sum + e.amount, 0) || 0;
    return currentTrip.totalBudget - (spotsCost + expCost);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] p-8 font-sans">
      <header className="flex justify-between items-center max-w-7xl mx-auto mb-12">
        <div>
          <h1 className="text-4xl font-light text-slate-800">
            Serene<span className="font-serif italic text-emerald-800">Scapes</span>
          </h1>
          <p className="text-slate-500 text-xs tracking-widest uppercase">Himachal Budget Planner</p>
        </div>

        <div className="flex gap-4">
        {/* Only show Reset if there is an active trip */}
        {currentTrip && (
          <button 
            onClick={handleResetTrip}
            className="text-slate-400 hover:text-red-500 transition-colors text-sm font-medium"
          >
            End Session
          </button>
        )}
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white border-2 border-emerald-800 text-emerald-800 px-8 py-2 rounded-full hover:bg-emerald-800 hover:text-white transition-all font-bold shadow-md"
        >
          {currentTrip ? `Active: ${currentTrip.title}` : "+ Start New Trip"}
        </button>
      </div>
      </header>

      {/* Mini Budget Dashboard & Itinerary Section */}
      {currentTrip && (
        <div className="max-w-7xl mx-auto mb-10 p-8 bg-white rounded-3xl shadow-sm border border-emerald-100">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Left Column: Budget Stats */}
            <div className="flex-1 border-r border-slate-100 pr-8">
              <h3 className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Active Itinerary</h3>
              <p className="text-2xl font-medium text-slate-800 mb-6">{currentTrip.title}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <h3 className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Total Limit</h3>
                  <p className="text-lg font-bold text-slate-700">₹{currentTrip.totalBudget}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl">
                  <h3 className="text-emerald-800/50 text-[10px] uppercase font-bold tracking-widest">Money Left</h3>
                  <p className={`text-lg font-bold ${calculateRemaining() < 1000 ? 'text-red-500' : 'text-emerald-700'}`}>
                    ₹{calculateRemaining()}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: The List of Spots */}
            <div className="flex-[2]">
              <h3 className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-4">Your Saved Spots</h3>
              <div className="max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                <ItineraryList 
                  selectedIds={currentTrip.selectedSpots} 
                  allSpots={spots} 
                />
              </div>
            </div>

          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-20 animate-pulse text-slate-400 font-medium">Finding the most peaceful trails...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {spots.map((spot) => (
              <SereneCard 
                key={spot._id} 
                spot={spot} 
                onAddToTrip={handleAddToTrip} 
              />
            ))}
          </div>
        )}
      </main>

      <CreateTripModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onTripCreated={handleTripCreated}
      />
    </div>
  )
}

export default App
