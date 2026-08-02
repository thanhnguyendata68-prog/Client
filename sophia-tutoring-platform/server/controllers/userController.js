// 👥 Controller 5: server/controllers/userController.js
// Purpose: Gives Sophie (Manager) full management of student directory records and progress notes.
const User = require('../models/User');

// @desc    Get all registered students (MANAGER only)
// @route   GET /api/users/students
// @access  Private (MANAGER)
const getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'CUSTOMER' }).sort({ createdAt: -1 });
        res.json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single student details with notes (MANAGER only)
// @route   GET /api/users/students/:id
// @access  Private (MANAGER)
const getStudentById = async (req, res) => {
    try {
        const student = await User.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update manager notes / student profile status (MANAGER only)
// @route   PUT /api/users/students/:id
// @access  Private (MANAGER)
const updateStudentByManager = async (req, res) => {
    try {
        const { bioOrNotes, isActive, program } = req.body;
        const student = await User.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        if (bioOrNotes !== undefined) student.bioOrNotes = bioOrNotes;
        if (isActive !== undefined) student.isActive = isActive;
        if (program) student.program = program;

        const updatedStudent = await student.save();
        res.json({
            success: true,
            data: updatedStudent
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getStudents,
    getStudentById,
    updateStudentByManager
};
