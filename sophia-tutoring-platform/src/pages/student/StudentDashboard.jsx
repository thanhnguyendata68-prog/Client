// 🎓 5. Student Dashboard (src/pages/student/StudentDashboard.jsx)

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [newBooking, setNewBooking] = useState({
        subject: 'NCLEX_RN_Prep',
        sessionType: '1-on-1',
        startTime: '',
        studentNotes: ''
    });

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const fetchMyBookings = async () => {
        try {
            const res = await api.get('/bookings/my');
            if (res.data.success) {
                setBookings(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching bookings:', err);
        }
    };

    const handleBookSession = async (e) => {
        e.preventDefault();
        try {
            const start = new Date(newBooking.startTime);
            const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour session

            await api.post('/bookings', {
                ...newBooking,
                startTime: start,
                endTime: end
            });

            setShowBookingModal(false);
            fetchMyBookings();
        } catch (err) {
            alert(err.response?.data?.message || 'Booking failed');
        }
    };

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2>Student Dashboard 🎓</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user?.name}! (Program: {user?.program})</p>
                </div>
                <button onClick={() => setShowBookingModal(true)} className="btn btn-primary">
                    + Book New Session
                </button>
            </div>

            {/* Booking Modal */}
            {showBookingModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="glass-card" style={{ width: '90%', maxWidth: '500px', background: '#0b132b' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Book Tutoring Session</h3>
                        <form onSubmit={handleBookSession}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Subject Focus</label>
                                <select
                                    value={newBooking.subject}
                                    onChange={(e) => setNewBooking({ ...newBooking, subject: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', background: '#1c2541', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                                >
                                    <option value="NCLEX_RN_Prep">NCLEX-RN Prep</option>
                                    <option value="NCLEX_RPN_Prep">NCLEX-RPN Prep</option>
                                    <option value="BScN_Course_Tutoring">BScN Course Tutoring</option>
                                    <option value="Dosage_Calculations">Dosage Calculations & Math</option>
                                    <option value="Clinical_Reasoning">Clinical Reasoning & ABGs</option>
                                    <option value="PSW_Skills_Prep">PSW Skills Prep</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Session Date & Time</label>
                                <input
                                    type="datetime-local"
                                    required
                                    value={newBooking.startTime}
                                    onChange={(e) => setNewBooking({ ...newBooking, startTime: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', background: '#1c2541', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Notes for Nurse Sophie</label>
                                <textarea
                                    rows={3}
                                    value={newBooking.studentNotes}
                                    onChange={(e) => setNewBooking({ ...newBooking, studentNotes: e.target.value })}
                                    placeholder="Mention specific questions or topics you want to cover..."
                                    style={{ width: '100%', padding: '0.75rem', background: '#1c2541', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <button type="button" onClick={() => setShowBookingModal(false)} className="btn btn-secondary">Cancel</button>
                                <button type="submit" className="btn btn-primary">Confirm Booking ($75/hr)</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Bookings List */}
            <h3 style={{ marginBottom: '1rem' }}>My Sessions & Invoices</h3>
            {bookings.length === 0 ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>No sessions booked yet. Click "+ Book New Session" above!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {bookings.map((item) => (
                        <div key={item._id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <span className={`badge ${item.status === 'CONFIRMED' ? 'badge-success' : 'badge-warning'}`}>
                                    {item.status}
                                </span>
                                <h4 style={{ margin: '0.5rem 0' }}>{item.subject.replace(/_/g, ' ')}</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                    📅 {new Date(item.startTime).toLocaleString()} ({item.durationMinutes} mins)
                                </p>
                                {item.meetingLink && (
                                    <p style={{ marginTop: '0.5rem' }}>
                                        🔗 Meeting Link: <a href={item.meetingLink} target="_blank" rel="noreferrer" style={{ color: '#00F5D4' }}>{item.meetingLink}</a>
                                    </p>
                                )}
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00F5D4' }}>
                                    ${item.payment?.amount} {item.payment?.currency}
                                </span>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Invoice #{item.payment?.invoiceNumber}</p>
                                <span className={`badge ${item.payment?.status === 'PAID' ? 'badge-success' : 'badge-warning'}`} style={{ marginTop: '0.4rem' }}>
                                    Payment: {item.payment?.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
