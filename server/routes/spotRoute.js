import express from 'express';
// Note: You must include the .js extension for local file imports
import { createSpot, getSpots } from '../controllers/spotController.js';

const router = express.Router();

router.route('/')
    .get(getSpots)
    .post(createSpot);

export default router;