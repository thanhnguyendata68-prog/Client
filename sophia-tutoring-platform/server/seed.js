// 🌱 Bonus: Quick Database Seed Script (server/seed.js)
// Create a new file server/seed.js to automatically populate test accounts so you can log in as Sophie (Manager) or Jessica (Student) right away!
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Booking = require('./models/Booking');
const Resource = require('./models/Resource');
const Inquiry = require('./models/Inquiry');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for Seeding...');

        await User.deleteMany({});
        await Booking.deleteMany({});
        await Resource.deleteMany({});
        await Inquiry.deleteMany({});

        // 1. Create Manager Account (Sophie RN)
        const sophieAdmin = await User.create({
            name: 'Sophie RN, BScN (Educator)',
            email: 'sophie.rn@example.com',
            password: 'Password123!',
            role: 'MANAGER',
            phone: '416-555-0199',
            program: 'NCLEX_RN',
            schoolOrInstitution: 'University of Toronto Faculty of Nursing',
            bioOrNotes: 'Lead Educator & Founder. Registered Nurse in ICU & Nephrology.'
        });

        // 2. Create Student Account
        const student1 = await User.create({
            name: 'Jessica Miller',
            email: 'jessica.student@example.com',
            password: 'Password123!',
            role: 'CUSTOMER',
            phone: '647-555-0142',
            program: 'BScN',
            schoolOrInstitution: 'Centennial College / TMU',
            bioOrNotes: 'Targeting NCLEX-RN exam. Needs help with Pharmacology & Dosage Math.'
        });

        // 3. Create Sample Resources
        await Resource.create([
            {
                title: 'NCLEX High-Yield Cardiac Mnemonics & EKG Tracing',
                description: 'Comprehensive guide covering MONA, Heart Failure symptoms, and arrhythmia prioritization.',
                category: 'NCLEX_Mnemonics',
                fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                fileType: 'pdf',
                fileSizeBytes: 2450000,
                accessLevel: 'PUBLIC',
                uploadedBy: sophieAdmin._id,
                downloadCount: 142
            },
            {
                title: 'Pediatric & Adult Dosage Calculation Formula Sheet',
                description: 'Step-by-step dimensional analysis and IV drip rate formulas with practice questions.',
                category: 'Dosage_Cheat_Sheets',
                fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                fileType: 'pdf',
                fileSizeBytes: 1850000,
                accessLevel: 'CUSTOMER',
                uploadedBy: sophieAdmin._id,
                downloadCount: 89
            }
        ]);

        // 4. Create Sample Booking
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(14, 0, 0, 0);

        const endTomorrow = new Date(tomorrow);
        endTomorrow.setHours(15, 0, 0, 0);

        await Booking.create({
            student: student1._id,
            subject: 'Dosage_Calculations',
            sessionType: '1-on-1',
            startTime: tomorrow,
            endTime: endTomorrow,
            durationMinutes: 60,
            status: 'CONFIRMED',
            meetingLink: 'https://zoom.us/j/9876543210',
            studentNotes: 'Please review IV heparin weight-based dosage protocols.',
            payment: {
                amount: 75.0,
                currency: 'CAD',
                status: 'PAID',
                invoiceNumber: 'INV-100201',
                paidAt: new Date()
            }
        });

        console.log('✅ Seeding Complete! Demo accounts created:');
        console.log(' - Manager: sophie.rn@example.com / Password123!');
        console.log(' - Student: jessica.student@example.com / Password123!');

        process.exit();
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
