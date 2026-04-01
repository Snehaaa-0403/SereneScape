import express from 'express';
import { 
    createTrip, 
    addSpotToItinerary, 
    addQuickExpense ,
    removeSpotFromItinerary,
    getAllTrips,
    getTripById
} from '../controllers/tripController.js';

const router = express.Router();

// Root route for trips
router.route('/')
    .post(createTrip)
    .get(getAllTrips);

router.route('/:id').get(getTripById);

// Specific trip actions
router.route('/:id/add-spot').put(addSpotToItinerary);
router.route('/:id/expense').put(addQuickExpense);
router.route('/:id/spots/:spotId').delete(removeSpotFromItinerary);

export default router;

