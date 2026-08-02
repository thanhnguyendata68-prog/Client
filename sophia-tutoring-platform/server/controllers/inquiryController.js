// 📩 Controller 4: server/controllers/inquiryController.js
// Purpose: Captures contact inquiries from prospective students and provides Manager lead pipeline tools.
const Inquiry = require('../models/Inquiry');

// @desc    Submit public contact form inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res) => {
    try {
        const { fullName, email, phone, targetProgram, message } = req.body;

        if (!fullName || !email || !message) {
            return res.status(400).json({ success: false, message: 'Please provide full name, email, and message' });
        }

        const inquiry = await Inquiry.create({
            fullName,
            email,
            phone: phone || '',
            targetProgram: targetProgram || 'BScN',
            message
        });

        res.status(201).json({
            success: true,
            message: 'Thank you for reaching out! Nurse Educator Sophie will contact you shortly.',
            data: inquiry
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all inquiries (MANAGER only)
// @route   GET /api/inquiries
// @access  Private (MANAGER)
const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: inquiries.length,
            data: inquiries
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update inquiry status & admin notes (MANAGER only)
// @route   PUT /api/inquiries/:id
// @access  Private (MANAGER)
const updateInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ success: false, message: 'Inquiry not found' });
        }

        const { status, adminNotes } = req.body;

        if (status) inquiry.status = status;
        if (adminNotes !== undefined) inquiry.adminNotes = adminNotes;

        const updatedInquiry = await inquiry.save();

        res.json({
            success: true,
            data: updatedInquiry
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createInquiry,
    getInquiries,
    updateInquiry
};
