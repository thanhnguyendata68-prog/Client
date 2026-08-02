// Manages educational materials, high-yield NCLEX mnemonics, dosage calculation guides, and clinical study packs uploaded by Sophie.
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Resource title is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Resource description is required'],
            trim: true
        },
        category: {
            type: String,
            required: true,
            enum: [
                'NCLEX_Mnemonics',
                'Dosage_Cheat_Sheets',
                'Clinical_Case_Studies',
                'Pharmacology_Guides',
                'Lab_Values_Mastery',
                'General_Study_Notes'
            ]
        },
        fileUrl: {
            type: String,
            required: [true, 'File path/URL is required']
        },
        fileType: {
            type: String,
            default: 'pdf' // pdf, docx, png, zip
        },
        fileSizeBytes: {
            type: Number,
            default: 0
        },
        accessLevel: {
            type: String,
            enum: ['PUBLIC', 'CUSTOMER', 'PREMIUM'],
            default: 'CUSTOMER'
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        downloadCount: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Resource', resourceSchema);
