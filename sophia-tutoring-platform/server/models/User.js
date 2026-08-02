// Handles authentication, user profiles, and role separation (CUSTOMER vs MANAGER).
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email address is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
            select: false // Excluded from default queries for security
        },
        role: {
            type: String,
            enum: ['CUSTOMER', 'MANAGER'],
            default: 'CUSTOMER'
        },
        phone: {
            type: String,
            trim: true
        },
        program: {
            type: String,
            enum: ['BScN', 'RPN', 'PSW', 'NCLEX_RN', 'NCLEX_RPN', 'Dosage_Calc', 'Other'],
            default: 'BScN'
        },
        schoolOrInstitution: {
            type: String,
            trim: true
        },
        bioOrNotes: {
            type: String,
            trim: true // Internal manager notes or student study goals
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);
