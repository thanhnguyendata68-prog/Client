// 📩 4. Contact Page (src/pages/public/ContactPage.jsx)

import React, { useState } from 'react';
import api from '../../services/api';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        targetProgram: 'BScN',
        message: ''
    });
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');
        try {
            const res = await api.post('/inquiries', formData);
            if (res.data.success) {
                setSuccessMsg(res.data.message);
                setFormData({ fullName: '', email: '', phone: '', targetProgram: 'BScN', message: '' });
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Failed to submit inquiry');
        }
    };

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }} className="glass-card">
                <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Send an Inquiry to Nurse Sophie 📧</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Have questions about NCLEX prep, dosage calculations, or 1-on-1 tutoring rates? Send a message below!
                </p>

                {successMsg && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
                        {successMsg}
                    </div>
                )}

                {errorMsg && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Your Full Name</label>
                        <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', background: '#0b132b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', background: '#0b132b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Phone</label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', background: '#0b132b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Program of Interest</label>
                        <select
                            value={formData.targetProgram}
                            onChange={(e) => setFormData({ ...formData, targetProgram: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', background: '#0b132b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                        >
                            <option value="BScN">BScN Undergrad</option>
                            <option value="RPN">RPN Nursing</option>
                            <option value="PSW">PSW Personal Support</option>
                            <option value="NCLEX_Prep">NCLEX-RN / RPN Exam Prep</option>
                            <option value="Dosage_Calc">Dosage Calculations Math</option>
                            <option value="Other">Other Consultation</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Message</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Describe your learning goals, upcoming exam date, or topic focus..."
                            style={{ width: '100%', padding: '0.75rem', background: '#0b132b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Submit Inquiry
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;

