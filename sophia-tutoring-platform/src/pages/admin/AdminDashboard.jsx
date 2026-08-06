// 🛡️ 7. Manager/Admin Dashboard (src/pages/admin/AdminDashboard.jsx)

import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [bookings, setBookings] = useState([]);
    const [students, setStudents] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [meetingUrlInput, setMeetingUrlInput] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const resB = await api.get('/bookings');
            if (resB.data.success) setBookings(resB.data.data);

            const resS = await api.get('/users/students');
            if (resS.data.success) setStudents(resS.data.data);

            const resI = await api.get('/inquiries');
            if (resI.data.success) setInquiries(resI.data.data);
        } catch (err) {
            console.error('Error fetching admin data:', err);
        }
    };

    const handleUpdateBooking = async (id, status, paymentStatus) => {
        try {
            await api.put(`/bookings/${id}`, {
                status,
                paymentStatus,
                meetingLink: meetingUrlInput[id] !== undefined ? meetingUrlInput[id] : undefined
            });
            fetchData();
        } catch (err) {
            alert('Update failed');
        }
    };

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <h2>Nurse Educator Admin Portal 🛡️</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Manage student schedules, Zoom links, payment statuses, student progress directory, and prospective inquiries.
            </p>

            {/* Admin Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setActiveTab('bookings')}
                    className={`btn ${activeTab === 'bookings' ? 'btn-primary' : 'btn-secondary'}`}
                >
                    📅 Schedule Manager ({bookings.length})
                </button>
                <button
                    onClick={() => setActiveTab('students')}
                    className={`btn ${activeTab === 'students' ? 'btn-primary' : 'btn-secondary'}`}
                >
                    👨‍🎓 Student Directory ({students.length})
                </button>
                <button
                    onClick={() => setActiveTab('inquiries')}
                    className={`btn ${activeTab === 'inquiries' ? 'btn-primary' : 'btn-secondary'}`}
                >
                    📩 Inquiries ({inquiries.length})
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'bookings' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3>All Scheduled Tutoring Sessions</h3>
                    {bookings.map((b) => (
                        <div key={b._id} className="glass-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div>
                                    <h4>{b.student?.name} ({b.student?.program})</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>📧 {b.student?.email} | 📞 {b.student?.phone}</p>
                                    <p style={{ marginTop: '0.4rem', fontWeight: 600, color: '#00F5D4' }}>
                                        Subject: {b.subject.replace(/_/g, ' ')} | Date: {new Date(b.startTime).toLocaleString()}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span className={`badge ${b.status === 'CONFIRMED' ? 'badge-success' : 'badge-warning'}`}>{b.status}</span>
                                    <p style={{ marginTop: '0.4rem' }}>Amount: ${b.payment?.amount} CAD ({b.payment?.status})</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    placeholder="Enter Zoom / Meet Link..."
                                    defaultValue={b.meetingLink}
                                    onChange={(e) => setMeetingUrlInput({ ...meetingUrlInput, [b._id]: e.target.value })}
                                    style={{ padding: '0.5rem', background: '#0b132b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff' }}
                                />
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => handleUpdateBooking(b._id, 'CONFIRMED', 'PAID')} className="btn btn-primary btn-sm">
                                        Confirm & Mark Paid
                                    </button>
                                    <button onClick={() => handleUpdateBooking(b._id, 'CANCELLED', 'UNPAID')} className="btn btn-secondary btn-sm">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'students' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3>Registered Students Directory</h3>
                    <div className="grid-2">
                        {students.map((s) => (
                            <div key={s._id} className="glass-card">
                                <h4>{s.name}</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Email: {s.email}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Program: {s.program} ({s.schoolOrInstitution || 'N/A'})</p>
                                <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Notes: {s.bioOrNotes || 'No notes added'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'inquiries' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3>Prospective Student Inquiries</h3>
                    {inquiries.map((inq) => (
                        <div key={inq._id} className="glass-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h4>{inq.fullName} (Program: {inq.targetProgram})</h4>
                                <span className="badge badge-teal">{inq.status}</span>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>📧 {inq.email} | 📞 {inq.phone || 'N/A'}</p>
                            <p style={{ marginTop: '0.75rem', background: '#0b132b', padding: '0.75rem', borderRadius: '8px' }}>
                                "{inq.message}"
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
