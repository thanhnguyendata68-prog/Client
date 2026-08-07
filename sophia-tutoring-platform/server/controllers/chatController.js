// Purpose: Handles /api/chat POST requests. Uses OpenAI API (if OPENAI_API_KEY is present in .env), with an intelligent Nurse Educator clinical fallback engine.

const axios = require('axios');

// @desc    Process AI Clinical Assistant inquiry
// @route   POST /api/chat
// @access  Public / Student / Manager
const processChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({ success: false, message: 'Message content is required' });
        }

        const apiKey = process.env.OPENAI_API_KEY;

        if (apiKey) {
            // Call OpenAI API
            try {
                const response = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        model: 'gpt-3.5-turbo',
                        messages: [
                            {
                                role: 'system',
                                content:
                                    'You are Nurse Sophie AI, a friendly, expert Canadian Registered Nurse (RN) and Educator. You specialize in NCLEX-RN/RPN prep, dosage calculations, clinical reasoning, ABG interpretation, and tutoring platform inquiries. Keep responses concise, clear, and encouraging using clinical bullet points and emojis.'
                            },
                            { role: 'user', content: message }
                        ],
                        temperature: 0.7,
                        max_tokens: 350
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${apiKey}`
                        }
                    }
                );

                const aiMessage = response.data.choices[0].message.content;
                return res.json({ success: true, reply: aiMessage });
            } catch (apiError) {
                console.warn('OpenAI API call failed, falling back to clinical rule engine:', apiError.message);
            }
        }

        // Intelligent Clinical Fallback Engine (Works 100% without an API key)
        const lower = message.toLowerCase();
        let reply = '';

        if (lower.includes('drip') || lower.includes('dosage') || lower.includes('math') || lower.includes('formula')) {
            reply =
                '💉 **Dosage Calculation Quick Tip:**\n\n' +
                '• **IV Flow Rate (mL/hr):** Total Volume (mL) ÷ Total Time (hr)\n' +
                '• **IV Drop Rate (gtt/min):** [Volume (mL) × Drop Factor (gtt/mL)] ÷ Time in Minutes\n\n' +
                'Need 1-on-1 help with dimensional analysis? You can book a session in your Student Dashboard!';
        } else if (lower.includes('nclex') || lower.includes('ngn') || lower.includes('sata') || lower.includes('prioritization')) {
            reply =
                '🩺 **NCLEX Prioritization & NGN Strategy:**\n\n' +
                '1. **Airway, Breathing, Circulation (ABCs):** Always evaluate ABCs first.\n' +
                '2. **Acute vs Chronic:** Acute onset changes always take priority over expected chronic illness findings.\n' +
                '3. **SATA Tip:** Treat each option in Select All That Apply as an individual True/False question!';
        } else if (lower.includes('book') || lower.includes('cost') || lower.includes('price') || lower.includes('rate')) {
            reply =
                '🎓 **Tutoring Sessions & Rates:**\n\n' +
                '• 1-on-1 Tutoring rate is **$75 CAD / hour**.\n' +
                '• Register or log in as a student to access the interactive Booking Engine & schedule your session with Nurse Sophie!';
        } else {
            reply =
                `Hello! I am Nurse Sophie's AI Clinical Assistant 🩺\n\n` +
                `I can help you with:\n` +
                `• **NCLEX Prep & Strategy** (NGN case studies, SATA, priority delegation)\n` +
                `• **Dosage Calculations & Math** (mL/hr, drip drop rates)\n` +
                `• **Tutoring Bookings & Information**\n\n` +
                `How can I assist your nursing studies today?`;
        }

        res.json({ success: true, reply });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { processChat };
