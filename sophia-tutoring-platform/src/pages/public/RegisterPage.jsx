// 📝 3. Register Page (src/pages/public/RegisterPage.jsx)
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        program: 'BScN',
        schoolOrInstitution: ''
    });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData);
            navigate('/student');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container" style={{ padding: '3rem 0', display: 'flex', justifyContent: 'center' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '500px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Create Student Account 🎓</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Join Nurse Educator Sophie's tutoring platform to book sessions and access high-yield notes.
                </p>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Full Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Jessica Miller"
                            style={{ width: '100%', padding: '0.75rem', background: '#0b132b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Email Address</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="jessica@example.com"
                            style={{ width: '100%', padding: '0.75rem', background: '#0b132b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Password (min 6 chars)</label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            style={{ width: '100%', padding: '0.75rem', background: '#0b132b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Program</label>
                            <select
                                value={formData.program}
                                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', background: '#0b132b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                            >
                                <option value="BScN">BScN Undergrad</option>
                                <option value="RPN">RPN Practical Nursing</option>
                                <option value="PSW">PSW Personal Support</option>
                                <option value="NCLEX_RN">NCLEX-RN Candidate</option>
                                <option value="NCLEX_RPN">NCLEX-RPN Candidate</option>
                                <option value="Dosage_Calc">Dosage Math Only</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>School / College</label>
                            <input
                                type="text"
                                value={formData.schoolOrInstitution}
                                onChange={(e) => setFormData({ ...formData, schoolOrInstitution: e.target.value })}
                                placeholder="e.g. Centennial / TMU"
                                style={{ width: '100%', padding: '0.75rem', background: '#0b132b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Register Student Account
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Already registered? <Link to="/login" style={{ color: '#00F5D4' }}>Log in here</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
