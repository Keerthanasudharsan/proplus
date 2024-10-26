require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes'); // Ensure courseRoutes handles all course-related routes
const forumRoutes = require('./routes/forumRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware'); 

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from React frontend
  credentials: true,                // Enable sending cookies
}));
app.use(cookieParser());

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit the application if connection fails
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes); // This will handle both /api/courses and /api/courses/:courseId/add-content
app.use('/api/forum', forumRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  await connectDB(); // Ensure the database is connected before starting the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
