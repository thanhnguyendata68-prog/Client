//Purpose: Dedicated page detailing the course curriculum for NCLEX-RN/RPN, Dosage Calculations, and Clinical Reasoning.
import React from 'react';
import { Link } from 'react-router-dom';

const CoursesPage = () => {
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
                <span className="badge badge-teal" style={{ marginBottom: '1rem' }}>
                    📚 Programs & Offerings
                </span>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    Specialized Medical & Nursing Tutoring Programs
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    Curriculum designed specifically for Canadian and international nursing students preparing for school exams and licensing.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Course 1 */}
                <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'center' }}>
                    <div>
                        <span className="badge badge-teal" style={{ marginBottom: '0.5rem' }}>Core Focus</span>
                        <h3>NCLEX-RN & NCLEX-RPN Prep</h3>
                        <p style={{ color: '#00F5D4', fontWeight: 600, marginTop: '0.5rem' }}>NGN Case Studies & Prioritization</p>
                    </div>
                    <div>
                        <ul style={{ listStyle: 'none', lineHeight: '2', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                            <li>• Next Generation NCLEX (NGN) extended multiple-response & matrix questions</li>
                            <li>• Prioritization strategies (Maslow's, ABCs, Acute vs Chronic)</li>
                            <li>• High-yield Pharmacology memory triggers and antidotes</li>
                            <li>• Mock NGN case study walkthroughs with live rationale breakdown</li>
                        </ul>
                    </div>
                </div>

                {/* Course 2 */}
                <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'center' }}>
                    <div>
                        <span className="badge badge-warning" style={{ marginBottom: '0.5rem' }}>Math Mastery</span>
                        <h3>Dosage Calculations & IV Drips</h3>
                        <p style={{ color: 'var(--color-warning)', fontWeight: 600, marginTop: '0.5rem' }}>Zero-Error Dosage Algorithms</p>
                    </div>
                    <div>
                        <ul style={{ listStyle: 'none', lineHeight: '2', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                            <li>• Step-by-step Dimensional Analysis & Formula method</li>
                            <li>• IV Flow Rate calculations (mL/hr and gtt/min drop rates)</li>
                            <li>• Weight-based pediatric dosing & IV heparin / insulin titrations</li>
                            <li>• Reconstitution math & high-alert medication safety protocols</li>
                        </ul>
                    </div>
                </div>

                {/* Course 3 */}
                <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'center' }}>
                    <div>
                        <span className="badge badge-teal" style={{ marginBottom: '0.5rem' }}>Undergrad & Skills</span>
                        <h3>Clinical Reasoning & ABG Interpretation</h3>
                        <p style={{ color: '#00F5D4', fontWeight: 600, marginTop: '0.5rem' }}>Pathophysiology & Lab Values</p>
                    </div>
                    <div>
                        <ul style={{ listStyle: 'none', lineHeight: '2', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                            <li>• Arterial Blood Gas (ABG) Tic-Tac-Toe interpretation method</li>
                            <li>• Lab value mastery (Electrolytes, CBC, Renal & Hepatic panels)</li>
                            <li>• Cardiac EKG rhythm recognition & emergency interventions</li>
                            <li>• OSCE lab exam prep and clinical documentation skills</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
