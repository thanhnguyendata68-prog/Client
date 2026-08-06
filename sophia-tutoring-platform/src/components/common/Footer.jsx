// 🧱 Component 2: src/components/common/Footer.jsx
// Purpose: Professional clinical branding footer showcasing Sophie's Registered Nurse credentials, tutoring domains, and contact info.

import React from 'react';

const Footer = () => {
    return (
        <footer style={{ background: '#070d1e', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '3rem 0 1.5rem', color: 'var(--text-muted)', marginTop: '4rem' }}>
            <div className="container">
                <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', color: '#fff', marginBottom: '1rem' }}>
                            🩺 Nurse Educator Sophie
                        </div>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                            Student-centred clinical, NCLEX, and nursing exam preparation powered by active clinical experience (ICU, ER, Nephrology) and visual mnemonics.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Specialized Tutoring</h4>
                        <ul style={{ listStyle: 'none', lineHeight: '2', fontSize: '0.9rem' }}>
                            <li>• NCLEX-RN & NCLEX-RPN Prep</li>
                            <li>• BScN & RPN Course Tutoring</li>
                            <li>• Dosage Calculations & IV Drip Math</li>
                            <li>• PSW Clinical Skills & Knowledge</li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Clinical Credentials</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                            <span>🎖️ Registered Nurse (RN) in Ontario</span>
                            <span>🎓 BScN Undergraduate Educator</span>
                            <span>🏥 ICU, ER & Acute Care Specialist</span>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Get in Touch</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                            <span>📧 sophie.rn@tutoring.ca</span>
                            <span>📞 (416) 555-0199</span>
                            <span>📍 Toronto, ON / Online Across Canada</span>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem' }}>
                    <p>© {new Date().getFullYear()} Sophie RN Medical & Nursing Tutoring. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
