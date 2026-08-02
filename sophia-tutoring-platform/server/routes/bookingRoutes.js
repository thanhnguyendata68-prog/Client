// Purpose: Maps /api/bookings endpoints for booking sessions, viewing student schedules, and manager approvals.
const express = require('express');
const router = express.Router();
const {
    createBooking,
    getMyBookings,
    getAllBookings,
    updateBooking,
    cancelBooking
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect); // All booking actions require login

router.post('/', createBooking);
router.get('/my', getMyBookings);
router.get('/', authorize('MANAGER'), getAllBookings);
router.put('/:id', updateBooking);
router.delete('/:id', cancelBooking);

module.exports = router;
