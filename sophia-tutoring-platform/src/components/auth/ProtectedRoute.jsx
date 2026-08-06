
//🛡️ Component 3: src/components/auth/ProtectedRoute.jsx
// Purpose: Protects private student & manager routes from unauthorized visitors.

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: 'var(--color-teal)' }}>
                <p>Verifying clinical session permissions...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <h3 style={{ color: 'var(--color-danger)', marginBottom: '1rem' }}>Access Restricted</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        Your account role (<strong>{user.role}</strong>) does not have permission to view this section.
                    </p>
                    <Navigate to="/" replace />
                </div>
            </div>
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;

