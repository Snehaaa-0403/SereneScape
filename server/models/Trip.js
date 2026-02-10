import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  totalBudget: { type: Number, required: true },
  selectedSpots: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Spot' 
  }],
  expenses: [{
    title: String,
    amount: Number,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const Trip = mongoose.model('Trip', TripSchema);
export default Trip;

