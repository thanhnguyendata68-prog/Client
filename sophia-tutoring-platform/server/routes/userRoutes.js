// Purpose: Maps /api/users for Manager access to the student directory and notes.
const express = require('express');
const router = express.Router();
const { getStudents, getStudentById, updateStudentByManager } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('MANAGER')); // Restricted to Sophie / Admin

router.get('/students', getStudents);
router.get('/students/:id', getStudentById);
router.put('/students/:id', updateStudentByManager);

module.exports = router;
