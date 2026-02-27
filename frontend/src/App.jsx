import { useState, useEffect } from 'react'
import SereneCard from './components/SereneCard'
import CreateTripModal from './components/CreateTripModel'
import ItineraryList from './components/ItenaryList'
import QuickExpense from './components/QuickExpense' 
import './App.css'
import SideBar from './components/SideBar';

function App() {
  const [spots, setSpots] = useState([]);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allTrips,setAllTrips]=useState([]);
  const [isSideBarOpen,setIsSidebarOpen] =useState(false);
  
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

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response=await fetch('http://localhost:5001/api/trips');
        const result = await response.json(); 
        if(result.success){
          setAllTrips(result.data);
        }
      }
      catch(error){
        console.log("Error loading trips:",error);
      }
      finally{
        setLoading(false);
      }
    }
    fetchData();
  },[currentTrip]);

  const handleLoadTrip = async(tripId)=>{
    try {
      const response = await fetch(`http://localhost:5001/api/trips/${tripId}`);
      const result = await response.json();
      if (result.success) {
        setCurrentTrip(result.data); // Restore the trip to the dashboard
        setIsSidebarOpen(false);     // Close the sidebar
      }
    } catch (error) {
      console.error("Error loading trip:", error);
    }
  }

  const handleRemoveSpot = async(spotId) => {
    if (!currentTrip) return;
    
    if(!window.confirm("Are you sure you want to remove this spot? The budget will be refunded.")) return;

    try {
      // Make sure this URL matches your backend route exactly
      const response = await fetch(`http://localhost:5001/api/trips/${currentTrip._id}/spots/${spotId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        setCurrentTrip(result.data); // This automatically updates the budget math!
      }
    } catch (error) {
      console.error("Error removing spot:", error);
    }
  };

  const handleResetTrip = () => {
    if (window.confirm("Are you sure you want to end this planning session? Your saved progress will remain in the database, but the dashboard will close.")) {
      setCurrentTrip(null);
    }
  };

  const handleTripCreated = (tripData) => {
    setCurrentTrip(tripData);
  }

  // 2. The Comprehensive Budget Guard
  // Updated: Accepts day, uses populated data structure
  const handleAddToTrip = async (spotId, day) => {
    if (!currentTrip) {
      alert("Please create a trip first!");
      setIsModalOpen(true);
      return;
    }

    // 1. Find Spot Details
    const newSpot = spots.find(s => s._id === spotId);
    const existingSpotsCost = currentTrip.selectedSpots.reduce((total, item) => {
      const cost = item.spot?.avgDailyCost || 0; 
      return total + cost;
    }, 0);

    const currentExpenses = currentTrip.expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0;
    const totalPotentialCost = existingSpotsCost + currentExpenses + newSpot.avgDailyCost;

    if (totalPotentialCost > currentTrip.totalBudget) {
      alert(`❌ Budget Exceeded! Limit: ₹${currentTrip.totalBudget}`);
      return; 
    }

    try {
      // 3. Send Spot ID AND Day
      const response = await fetch(`http://localhost:5001/api/trips/${currentTrip._id}/add-spot`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spotId, day }) 
      });

      const result = await response.json();
      if (result.success) {
        setCurrentTrip(result.data); // Update with new populated data
      }
    } catch (error) {
      console.error("Error adding spot:", error);
    }
  }

  // Updated: Simpler calculation using populated data
  const calculateRemaining = () => {
    if (!currentTrip) return 0;
    
    // 1. Calculate Spot Costs
    const spotsCost = currentTrip.selectedSpots.reduce((total, item) => {
      const cost = item.spot?.avgDailyCost || 0; 
      return total + cost;
    }, 0);
    
    // 2. Calculate Manual Expenses
    const expCost = currentTrip.expenses?.reduce((sum, e) => {
        return sum + (Number(e.amount) || 0); 
    }, 0) || 0;

    // 3. Final Math
    return currentTrip.totalBudget - (spotsCost + expCost);
  };

  // 3. New Logic: Manual Expense Logger
  const handleAddExpense = async (title, amount) => {
    if (!currentTrip) return;

    const remaining = calculateRemaining();
    if (amount > remaining) {
      alert(`❌ Expense exceeds your remaining budget of ₹${remaining}!`);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/trips/${currentTrip._id}/expense`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, amount: Number(amount) }) 
      });

      const result = await response.json();
      if (result.success) {
        setCurrentTrip(result.data); // Update state to reflect new expense
      }
    } catch (error) {
      console.error("Error logging expense:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] p-8 font-sans">
      <header className="flex justify-between items-center max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-6">
          
          {/* THE TRIPLE EQUAL BUTTON (≡) */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-4xl text-slate-400 hover:text-emerald-800 transition-colors leading-none pb-2"
            title="Open History"
          >
            &equiv; 
          </button>

          <div>
            <h1 className="text-4xl font-light text-slate-800">
              Serene<span className="font-serif italic text-emerald-800">Scapes</span>
            </h1>
            <p className="text-slate-500 text-xs tracking-widest uppercase">Himachal Budget Planner</p>
          </div>
        </div>

        <div className="flex gap-4">
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
      {/* Sidebar component */}
      <SideBar
        isOpen={isSideBarOpen}
        onClose={()=>setIsSidebarOpen(false)}
        savedTrips={allTrips}
        onLoadTrip={handleLoadTrip}
      /> 

      {currentTrip && (
        <div className="max-w-7xl mx-auto mb-10 p-8 bg-white rounded-3xl shadow-sm border border-emerald-100">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Left Column: Budget Stats & Quick Expense Logger */}
            <div className="flex-1 border-r border-slate-100 pr-8">
              <h3 className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Active Itinerary</h3>
              <p className="text-2xl font-medium text-slate-800 mb-6">{currentTrip.title}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
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

              {/* Step 2: Placement of QuickExpense Form */}
              <QuickExpense onAddExpense={handleAddExpense} />
            </div>

            {/* Right Column: The List of Spots */}
            <div className="flex-[2]">
              <h3 className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-4">Your Saved Spots</h3>
              <div className="max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                <ItineraryList 
                  selectedIds={currentTrip.selectedSpots} 
                  allSpots={spots} 
                  onDelete={handleRemoveSpot}
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

export default App;
