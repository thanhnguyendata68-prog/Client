// 🖥️ Part 2: Main Server Entry Point (server/server.js)
// Purpose: Initializes Express, enables CORS, registers all API routes, handles errors, and starts the Node server listening on PORT 5000.
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

// Import Route Modules
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');

// Load Environment Variables
dotenv.config();

// Connect MongoDB Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Health Check Route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        service: 'Sophie RN Medical & Nursing Tutoring Platform API',
        timestamp: new Date().toISOString()
    });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/inquiries', inquiryRoutes);
const chatRoutes = require('./routes/chatRoutes');

// Mount Route
app.use('/api/chat', chatRoutes);

// Central Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;
