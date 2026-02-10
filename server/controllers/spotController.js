import Spot from '../models/Spot.js';

// @desc    Add a new quiet spot
// @route   POST /api/spots
export const createSpot = async (req, res) => {
    try {
        const { name, description } = req.body;

        // 1. UNIQUE CHECK: Check if the spot name already exists in MongoDB
        const existingSpot = await Spot.findOne({ name });
        if (existingSpot) {
            return res.status(400).json({ success: false, message: "This spot has already been shared!" });
        }

        // 2. TOURIST CHECK: Define words often associated with regular tourist spots
        const touristKeywords = ['Shimla', 'Manali', 'Mall Road', 'Rohtang Pass', 
                                'Solang Valley', 'Hadimba Temple', 'Dalhousie', 
                                'Kullu', 'Dharamshala', 'McLeod Ganj', 'Kasauli', 
                                'Khajjiar', 'Kufri', 'Jakhoo Temple', 'Christ Church'];
        const isTouristy = touristKeywords.some(keyword => name.toLowerCase().includes(keyword.toLowerCase()));
        
        if (isTouristy) {
            return res.status(400).json({ success: false, message: "This looks like a regular tourist spot. We only allow hidden gems!" });
        }

        // 3. GOOD VIBES CHECK: Ensure the description contains positive sentiment (simple version)
        const goodVibeKeywords = ['quiet', 'peaceful', 'hidden', 'serene', 'calm', 'nature'];
        const hasGoodVibes = goodVibeKeywords.some(keyword => description.toLowerCase().includes(keyword));

        if (!hasGoodVibes) {
            return res.status(400).json({ success: false, message: "Description must mention the peaceful/quiet vibes of the spot." });
        }

        // If all checks pass, save to MongoDB
        const newSpot = await Spot.create(req.body);
        res.status(201).json({ success: true, data: newSpot });
        
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all quiet spots
// @route   GET /api/spots
export const getSpots = async (req, res) => {
    try {
        const spots = await Spot.find(); // Fetches all spots
        res.status(200).json({ success: true, data: spots });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

