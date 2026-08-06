// 🌐 1. Public Landing Page (src/pages/public/HomePage.jsx)

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section style={{ padding: '4rem 0 3rem', textTransform: 'none' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                    <div>
                        <span className="badge badge-teal" style={{ marginBottom: '1rem' }}>
                            🩺 Registered Nurse & Clinical Educator in Ontario
                        </span>
                        <h1 style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: '1.25rem' }}>
                            Master Clinical Reasoning & Ace Your <span style={{ color: '#00F5D4' }}>NCLEX / Nursing</span> Exams
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                            Personalized 1-on-1 & group tutoring for BScN undergrads, RPNs, PSWs, and NCLEX candidates. Taught using visual mnemonics, real-world ICU/ER clinical cases, and dosage drip math algorithms.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/register" className="btn btn-primary">
                                Book a Session 🚀
                            </Link>
                            <Link to="/contact" className="btn btn-secondary">
                                Inquire via Contact Form
                            </Link>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(0, 245, 212, 0.2)' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#00F5D4' }}>👨‍⚕️ Why Learn with Sophie RN?</h3>
                        <ul style={{ listStyle: 'none', lineHeight: '2.2', fontSize: '0.95rem' }}>
                            <li>✅ <strong>Active RN Experience:</strong> Real-world ICU, ER, Nephrology & Acute Care insights.</li>
                            <li>✅ <strong>Undergrad Educator:</strong> Teaching BScN candidates at top Canadian institutions.</li>
                            <li>✅ <strong>High-Yield Mnemonics:</strong> Visual memory triggers for Pharmacology & Lab values.</li>
                            <li>✅ <strong>100% Student-Centred:</strong> Custom pacing, practice NCLEX NGN questions & dosage math.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Course Highlights */}
            <section style={{ padding: '3rem 0', background: 'rgba(28, 37, 65, 0.3)' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Specialized Tutoring Programs</h2>
                    <div className="grid-3">
                        <div className="glass-card">
                            <span className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>NCLEX Prep</span>
                            <h3>NCLEX-RN & RPN Mastery</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.75rem 0' }}>
                                Next Generation NCLEX (NGN) case study breakdowns, priority delegation, and SATA confidence strategies.
                            </p>
                        </div>

                        <div className="glass-card">
                            <span className="badge badge-warning" style={{ marginBottom: '0.75rem' }}>Math & Pharma</span>
                            <h3>Dosage Calculations & Drip Math</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.75rem 0' }}>
                                Master dimensional analysis, IV infusion rates (mL/hr, gtt/min), pediatric dosing, and high-alert meds.
                            </p>
                        </div>

                        <div className="glass-card">
                            <span className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>BScN / RPN / PSW</span>
                            <h3>Clinical Reasoning & Skills</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.75rem 0' }}>
                                Pathophysiology, lab value interpretation (ABGs, Electrolytes), cardiac EKG tracings, and OSCE prep.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
