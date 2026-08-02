// 📅 Controller 2: server/controllers/bookingController.js
// Purpose: Handles booking tutoring sessions, calculating rates, updating Zoom links, payment status, and cancellations.
const Booking = require('../models/Booking');

// @desc    Create a new tutoring session booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    try {
        const { subject, sessionType, startTime, endTime, durationMinutes, studentNotes, amount } = req.body;

        const studentId = req.user.role === 'MANAGER' && req.body.studentId ? req.body.studentId : req.user._id;
        const sessionRate = amount || 75.0; // Default CAD $75/hr rate

        const booking = await Booking.create({
            student: studentId,
            subject,
            sessionType: sessionType || '1-on-1',
            startTime,
            endTime,
            durationMinutes: durationMinutes || 60,
            studentNotes: studentNotes || '',
            payment: {
                amount: sessionRate,
                currency: 'CAD',
                status: 'UNPAID',
                invoiceNumber: `INV-${Date.now().toString().slice(-6)}`
            }
        });

        const populatedBooking = await Booking.findById(booking._id).populate('student', 'name email phone program');

        res.status(201).json({
            success: true,
            data: populatedBooking
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get logged in user's bookings (Student view)
// @route   GET /api/bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ student: req.user._id })
            .populate('student', 'name email program')
            .sort({ startTime: 1 });

        res.json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all bookings across platform (Manager view)
// @route   GET /api/bookings
// @access  Private (MANAGER)
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('student', 'name email phone program schoolOrInstitution')
            .sort({ startTime: -1 });

        res.json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update booking status, zoom link, manager notes or payment
// @route   PUT /api/bookings/:id
// @access  Private
const updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking session not found' });
        }

        if (req.user.role !== 'MANAGER' && booking.student.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to modify this booking' });
        }

        const { status, meetingLink, managerNotes, studentNotes, paymentStatus } = req.body;

        if (status) booking.status = status;
        if (studentNotes !== undefined) booking.studentNotes = studentNotes;

        if (req.user.role === 'MANAGER') {
            if (meetingLink !== undefined) booking.meetingLink = meetingLink;
            if (managerNotes !== undefined) booking.managerNotes = managerNotes;
            if (paymentStatus) {
                booking.payment.status = paymentStatus;
                if (paymentStatus === 'PAID' && !booking.payment.paidAt) {
                    booking.payment.paidAt = new Date();
                }
            }
        }

        const updatedBooking = await booking.save();
        const populated = await Booking.findById(updatedBooking._id).populate('student', 'name email phone program');

        res.json({
            success: true,
            data: populated
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Cancel a booking session
// @route   DELETE /api/bookings/:id
// @access  Private
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking session not found' });
        }

        if (req.user.role !== 'MANAGER' && booking.student.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        booking.status = 'CANCELLED';
        await booking.save();

        res.json({
            success: true,
            message: 'Booking session cancelled successfully',
            data: booking
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    getAllBookings,
    updateBooking,
    cancelBooking
};

