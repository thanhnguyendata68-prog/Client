// Captures prospective student inquiries sent from the public website contact form.
const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email address is required'],
            lowercase: true,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        targetProgram: {
            type: String,
            enum: ['BScN', 'RPN', 'PSW', 'NCLEX_Prep', 'Dosage_Calc', 'Other'],
            default: 'BScN'
        },
        message: {
            type: String,
            required: [true, 'Message content is required'],
            trim: true
        },
        status: {
            type: String,
            enum: ['NEW', 'IN_REVIEW', 'CONTACTED', 'CONVERTED', 'ARCHIVED'],
            default: 'NEW'
        },
        adminNotes: {
            type: String,
            trim: true // Notes on phone consultations or followup emails
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
