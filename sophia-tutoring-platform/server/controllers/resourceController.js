// 📚 Controller 3: server/controllers/resourceController.js
// Purpose: Manages study notes, NCLEX mnemonics, dosage guides, access permissions, and download counters.
const Resource = require('../models/Resource');

// @desc    Get resources (Filtered by role / public access)
// @route   GET /api/resources
// @access  Public / Private
const getResources = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = { isPublished: true };

        if (!req.user) {
            query.accessLevel = 'PUBLIC';
        } else if (req.user.role !== 'MANAGER') {
            query.accessLevel = { $in: ['PUBLIC', 'CUSTOMER'] };
        }

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const resources = await Resource.find(query).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: resources.length,
            data: resources
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create new study resource (MANAGER only)
// @route   POST /api/resources
// @access  Private (MANAGER)
const createResource = async (req, res) => {
    try {
        const { title, description, category, fileUrl, fileType, fileSizeBytes, accessLevel } = req.body;

        const resource = await Resource.create({
            title,
            description,
            category,
            fileUrl,
            fileType: fileType || 'pdf',
            fileSizeBytes: fileSizeBytes || 0,
            accessLevel: accessLevel || 'CUSTOMER',
            uploadedBy: req.user._id
        });

        res.status(201).json({
            success: true,
            data: resource
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Increment resource download counter
// @route   POST /api/resources/:id/download
// @access  Public / Private
const downloadResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ success: false, message: 'Resource not found' });
        }

        resource.downloadCount += 1;
        await resource.save();

        res.json({
            success: true,
            downloadUrl: resource.fileUrl,
            downloadCount: resource.downloadCount
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete resource (MANAGER only)
// @route   DELETE /api/resources/:id
// @access  Private (MANAGER)
const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ success: false, message: 'Resource not found' });
        }

        await resource.deleteOne();

        res.json({
            success: true,
            message: 'Resource removed successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getResources,
    createResource,
    downloadResource,
    deleteResource
};
