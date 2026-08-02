// Purpose: Maps /api/resources endpoints for browsing, downloading, and uploading study notes & mnemonics.
const express = require('express');
const router = express.Router();
const {
    getResources,
    createResource,
    downloadResource,
    deleteResource
} = require('../controllers/resourceController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Optional token check for getResources so logged-in users see CUSTOMER materials
const optionalAuth = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        return protect(req, res, next);
    }
    next();
};

router.get('/', optionalAuth, getResources);
router.post('/:id/download', optionalAuth, downloadResource);

// Manager restricted routes
router.post('/', protect, authorize('MANAGER'), createResource);
router.delete('/:id', protect, authorize('MANAGER'), deleteResource);

module.exports = router;
