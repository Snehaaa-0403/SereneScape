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

export const getAllTrips = async(req,res) => {
    try{
        const trips=await Trip.find({},'title totalBudget createdAt').sort({createdAt:-1}); 
        res.status(200).json({ success: true, data: trips });
    }
    catch(error){
        res.status(400).json({ success: false, message: error.message });
    }
}

export const getTripById = async(req,res)=>{
    try{
        const trip=await Trip.findById(req.params.id).populate('selectedSpots.spot');
        if (!trip) {
            return res.status(404).json({ success: false, message: "Trip not found" });
        }
        res.status(200).json({ success: true, data: trip });
    }
    catch(error){
        res.status(400).json({ success: false, message: error.message });
    }
}

export const addSpotToItinerary = async (req, res) => {
    try {
        const { spotId, day } = req.body;
        const trip = await Trip.findById(req.params.id);
        
        trip.selectedSpots.push({ spot: spotId, day: day || 1 });
        await trip.save();

        const updatedTrip = await Trip.findById(req.params.id).populate('selectedSpots.spot');
        res.status(200).json({ success: true, data: updatedTrip });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const addQuickExpense = async (req, res) => {
    try {
        const { title, amount, day } = req.body;
        const trip = await Trip.findById(req.params.id);
        
        // ADD THIS: Push the expense into the array defined in your Trip model
        trip.expenses.push({ title, amount: Number(amount), day: day || 1 });
        await trip.save(); // This saves it to MongoDB
        
        const populatedTrip = await Trip.findById(req.params.id)
            .populate('selectedSpots.spot');

        res.status(200).json({ 
            success: true, 
            message: `Logged ₹${amount} for ${title}`,
            data: populatedTrip
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const removeSpotFromItinerary = async (req, res) => {
    try {
        const { id, spotId } = req.params;
        const trip = await Trip.findById(id);

        trip.selectedSpots = trip.selectedSpots.filter(
            (item) => item.spot.toString() !== spotId
        );

        await trip.save();

        // 2. Populate again to send fresh data back
        const updatedTrip = await Trip.findById(id).populate('selectedSpots.spot');
        
        res.status(200).json({ success: true, data: updatedTrip });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

