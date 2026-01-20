import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/booking.js';
import hotelRoutes from './routes/hotels.js';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONN)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/hotels', hotelRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
