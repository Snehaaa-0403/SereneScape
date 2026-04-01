import express from 'express';
import { createSpot, getSpots } from '../controllers/spotController.js';

const router = express.Router();

router.route('/')
    .get(getSpots)
    .post(createSpot);

export default router;