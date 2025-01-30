import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;



// Middleware
app.use(cors({
  origin: "*", // ✅ Allow only this frontend
  methods: "GET, POST, PUT, DELETE",
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
  
// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/workouts', workoutRoutes);

// // Handle unhandled routes
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Error-handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

// Connect to MongoDB



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


app.listen(port, () => console.log(`Server running on port ${port}`));