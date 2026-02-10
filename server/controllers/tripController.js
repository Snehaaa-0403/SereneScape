import Trip from '../models/Trip.js';
import Spot from '../models/Spot.js';

export const createTrip = async (req, res) => {
    try {
        const newTrip = await Trip.create(req.body);
        res.status(201).json({ success: true, data: newTrip });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const addSpotToItinerary = async (req, res) => {
    try {
        const { spotId } = req.body;
        const trip = await Trip.findById(req.params.id);

        if (!trip.selectedSpots.includes(spotId)) {
            trip.selectedSpots.push(spotId);
            await trip.save();
        }
        res.status(200).json({ success: true, data: trip });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const addQuickExpense = async (req, res) => {
    try {
        const { title, amount } = req.body;
        const trip = await Trip.findById(req.params.id);
        
        // ADD THIS: Push the expense into the array defined in your Trip model
        trip.expenses.push({ title, amount });
        await trip.save(); // This saves it to MongoDB
        
        // Calculate remaining budget for the response
        const totalSpent = trip.expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const remaining = trip.totalBudget - totalSpent;

        res.status(200).json({ 
            success: true, 
            message: `Logged ₹${amount} for ${title}. Remaining: ₹${remaining}`,
            data: trip 
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

