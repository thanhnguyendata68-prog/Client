// Purpose: Maps /api/inquiries for public contact submissions and manager lead management.
const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries, updateInquiry } = require('../controllers/inquiryController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', createInquiry); // Public contact form
router.get('/', protect, authorize('MANAGER'), getInquiries);
router.put('/:id', protect, authorize('MANAGER'), updateInquiry);

module.exports = router;
