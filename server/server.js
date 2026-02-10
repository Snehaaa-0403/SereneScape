import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'; // This automatically loads your .env variables
import connectDB from './config/db.js';
import spotRoute from './routes/spotRoute.js';
import tripRoute from './routes/tripROute.js';

const app = express();
const port = process.env.PORT || 5001;

// Connect to Database
connectDB();

// Middleware
app.use(express.json()); 
app.use(cors());         

// Routes
app.use('/api/spots', spotRoute);
app.use('/api/trips', tripRoute);

app.get('/', (req, res) => {
    res.send('SereneScapes API is running...');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} 🚀`);
});

