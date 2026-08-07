// Purpose: Dedicated page highlighting Nurse Educator Sophie's clinical credentials (ICU, ER, Nephrology) and student-centred teaching philosophy.

import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
                <span className="badge badge-teal" style={{ marginBottom: '1rem' }}>
                    🩺 Meet Your Educator
                </span>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    Registered Nurse, ICU Specialist & Clinical Faculty
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                    Hi, I'm Sophie — a practicing Registered Nurse in Ontario, Canada, with a passion for empowering nursing students and NCLEX candidates to master clinical reasoning without memorization burn-out.
                </p>
            </div>

            {/* Grid Features */}
            <div className="grid-3" style={{ marginBottom: '4rem' }}>
                <div className="glass-card">
                    <h3 style={{ color: '#00F5D4', marginBottom: '0.75rem' }}>🏥 Clinical Background</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                        Extensive bedside clinical experience across Intensive Care (ICU), Emergency Department (ER), Acute Care, and Nephrology. I bring real clinical cases straight to our tutoring sessions.
                    </p>
                </div>

                <div className="glass-card">
                    <h3 style={{ color: '#00F5D4', marginBottom: '0.75rem' }}>🎓 Academic Pedagogy</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                        Faculty experience educating BScN undergraduate students, RPN practical nursing candidates, and PSWs. Specializing in Next Gen NCLEX (NGN) exam strategy and SATA confidence.
                    </p>
                </div>

                <div className="glass-card">
                    <h3 style={{ color: '#00F5D4', marginBottom: '0.75rem' }}>💡 Student-Centred Style</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                        Using visual mnemonics, step-by-step dosage calculation algorithms, and pathophysiologic memory triggers tailored to your individual learning pace.
                    </p>
                </div>
            </div>

            {/* CTA */}
            <div className="glass-card" style={{ textStyle: 'center', textAlign: 'center', padding: '3rem 2rem' }}>
                <h2 style={{ marginBottom: '1rem' }}>Ready to Elevate Your Nursing Career?</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Book a 1-on-1 session or send a direct inquiry to discuss your exam targets.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/register" className="btn btn-primary">
                        Register as Student
                    </Link>
                    <Link to="/contact" className="btn btn-secondary">
                        Send Inquiry
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
