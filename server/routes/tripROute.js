import express from 'express';
import { 
    createTrip, 
    addSpotToItinerary, 
    addQuickExpense 
} from '../controllers/tripController.js';

const router = express.Router();

// Root route for trips
router.route('/').post(createTrip);

// Specific trip actions
router.route('/:id/add-spot').put(addSpotToItinerary);
router.route('/:id/expense').put(addQuickExpense);

export default router;

