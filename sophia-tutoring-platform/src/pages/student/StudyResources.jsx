// 📖 6. Study Resources Page (src/pages/student/StudyResources.jsx)

import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const StudyResources = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const res = await api.get('/resources');
            if (res.data.success) {
                setResources(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching resources:', err);
        }
    };

    const handleDownload = async (id, fileUrl) => {
        try {
            await api.post(`/resources/${id}/download`);
            window.open(fileUrl, '_blank');
            fetchResources();
        } catch (err) {
            alert('Download error');
        }
    };

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <h2>Study Materials & High-Yield Mnemonics 📖</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Download high-yield NCLEX mnemonics, dosage calculation formula sheets, and clinical case study guides created by Nurse Sophie.
            </p>

            <div className="grid-3">
                {resources.map((item) => (
                    <div key={item._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <span className="badge badge-teal" style={{ marginBottom: '0.5rem' }}>{item.category.replace(/_/g, ' ')}</span>
                            <h3>{item.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.75rem 0' }}>{item.description}</p>
                        </div>
                        <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📥 {item.downloadCount} Downloads</span>
                            <button onClick={() => handleDownload(item._id, item.fileUrl)} className="btn btn-primary btn-sm">
                                Download PDF
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudyResources;
