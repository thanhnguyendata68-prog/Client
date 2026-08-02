// Step 4: Express Routes (authRoutes, bookingRoutes, etc.) and Server Entry Point (server.js)!
// 🛣️ Part 1: Express Route Files

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
