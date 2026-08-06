// 🧱 Component 1: src/components/common/Navbar.jsx
// Purpose: Responsive top navigation bar displaying brand logo, navigation links, and dynamic role options (GUEST, CUSTOMER, MANAGER).

import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="nav-brand">
                    <span style={{ color: '#00F5D4', fontSize: '1.6rem' }}>🩺</span>
                    <div>
                        Sophie<span style={{ color: '#00F5D4' }}>RN</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginTop: '-4px' }}>
                            Clinical Educator
                        </span>
                    </div>
                </Link>

                <ul className="nav-links">
                    <li>
                        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
                    </li>
                    <li>
                        <Link to="/courses" className={`nav-link ${isActive('/courses') ? 'active' : ''}`}>Courses & Prep</Link>
                    </li>
                    <li>
                        <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About Sophie</Link>
                    </li>
                    <li>
                        <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
                    </li>

                    {/* Dynamic Role Navigation Links */}
                    {user ? (
                        <>
                            {user.role === 'CUSTOMER' && (
                                <>
                                    <li>
                                        <Link to="/student" className={`nav-link ${isActive('/student') ? 'active' : ''}`}>
                                            📅 Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/student/resources" className={`nav-link ${isActive('/student/resources') ? 'active' : ''}`}>
                                            📖 Notes & Mnemonics
                                        </Link>
                                    </li>
                                </>
                            )}

                            {user.role === 'MANAGER' && (
                                <li>
                                    <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
                                        🛡️ Admin Portal
                                    </Link>
                                </li>
                            )}

                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '1rem' }}>
                                <span className="badge badge-teal">
                                    👤 {user.name.split(' ')[0]} ({user.role})
                                </span>
                                <button onClick={handleLogout} className="btn btn-secondary btn-sm" title="Log Out">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li style={{ display: 'flex', gap: '0.75rem', marginLeft: '1rem' }}>
                            <Link to="/login" className="btn btn-secondary btn-sm">Log In</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
