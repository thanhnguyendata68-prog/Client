// Tracks 1-on-1 and group tutoring sessions, schedule dates, session subjects, zoom meeting links, and invoice details.
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        subject: {
            type: String,
            required: [true, 'Subject is required'],
            enum: [
                'NCLEX_RN_Prep',
                'NCLEX_RPN_Prep',
                'BScN_Course_Tutoring',
                'Dosage_Calculations',
                'Clinical_Reasoning',
                'PSW_Skills_Prep',
                'Custom_Consultation'
            ]
        },
        sessionType: {
            type: String,
            enum: ['1-on-1', 'Group_Session', 'Exam_Prep_Express'],
            default: '1-on-1'
        },
        startTime: {
            type: Date,
            required: [true, 'Start date and time is required']
        },
        endTime: {
            type: Date,
            required: [true, 'End date and time is required']
        },
        durationMinutes: {
            type: Number,
            required: true,
            default: 60
        },
        status: {
            type: String,
            enum: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
            default: 'PENDING'
        },
        meetingLink: {
            type: String,
            default: '' // Zoom / Google Meet link added by Manager upon confirmation
        },
        studentNotes: {
            type: String,
            trim: true // Specific topics or questions student wants to cover
        },
        managerNotes: {
            type: String,
            trim: true // Private notes for Sophie (e.g. key focus areas for session)
        },
        payment: {
            amount: { type: Number, required: true, default: 0 },
            currency: { type: String, default: 'CAD' },
            status: {
                type: String,
                enum: ['UNPAID', 'PAID', 'REFUNDED'],
                default: 'UNPAID'
            },
            invoiceNumber: { type: String },
            paidAt: { type: Date }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Booking', bookingSchema);
