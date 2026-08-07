// Purpose: Bottom-right floating widget accessible across all pages with automated typing indicator, message history, and quick prompts.jsx

import React, { useState, useRef, useEffect } from 'react';
import api from '../../services/api';

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: 'ai',
            text: 'Hi! I am Nurse Sophie AI 🩺 How can I help with your NCLEX prep, dosage math, or tutoring questions today?'
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (textToSend) => {
        const query = textToSend || input;
        if (!query.trim()) return;

        const userMsg = { sender: 'user', text: query };
        setMessages((prev) => [...prev, userMsg]);
        if (!textToSend) setInput('');
        setLoading(true);

        try {
            const res = await api.post('/chat', { message: query });
            if (res.data.success) {
                setMessages((prev) => [...prev, { sender: 'ai', text: res.data.reply }]);
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { sender: 'ai', text: 'Sorry, I had trouble connecting. Please try again shortly.' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 1000 }}>
            {/* Expanded Chat Window */}
            {isOpen && (
                <div
                    className="glass-card"
                    style={{
                        width: '360px',
                        height: '480px',
                        marginBottom: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 0,
                        background: '#0b132b',
                        border: '1px solid rgba(0, 245, 212, 0.3)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                        overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            padding: '1rem',
                            background: 'var(--gradient-teal-blue)',
                            color: '#0b132b',
                            fontWeight: 'bold',
                            display: 'flex',
                            justify: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.2rem' }}>🩺</span>
                            <div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>Nurse Sophie AI</div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>Clinical & NCLEX Helper</div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#0b132b' }}
                        >
                            ✖
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {messages.map((m, idx) => (
                            <div
                                key={idx}
                                style={{
                                    alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '85%',
                                    background: m.sender === 'user' ? '#3a86ff' : 'rgba(28, 37, 65, 0.9)',
                                    color: '#fff',
                                    padding: '0.65rem 0.9rem',
                                    borderRadius: m.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                                    fontSize: '0.85rem',
                                    whiteSpace: 'pre-line',
                                    lineHeight: '1.5'
                                }}
                            >
                                {m.text}
                            </div>
                        ))}

                        {loading && (
                            <div style={{ alignSelf: 'flex-start', color: '#00F5D4', fontSize: '0.8rem' }}>
                                Nurse Sophie AI is typing...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Prompts */}
                    <div style={{ padding: '0.4rem 0.75rem', display: 'flex', gap: '0.4rem', overflowX: 'auto', background: 'rgba(255,255,255,0.03)' }}>
                        <button
                            onClick={() => handleSend('How to calculate IV drip rate?')}
                            className="badge badge-teal"
                            style={{ cursor: 'pointer', whiteSpace: 'nowrap', textTransform: 'none' }}
                        >
                            💧 IV Math
                        </button>
                        <button
                            onClick={() => handleSend('NCLEX prioritization tips')}
                            className="badge badge-warning"
                            style={{ cursor: 'pointer', whiteSpace: 'nowrap', textTransform: 'none' }}
                        >
                            🩺 NCLEX Strategy
                        </button>
                    </div>

                    {/* Input Box */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem', background: '#1c2541' }}
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask Nurse Sophie AI..."
                            style={{
                                flex: 1,
                                padding: '0.5rem 0.75rem',
                                background: '#0b132b',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '0.85rem'
                            }}
                        />
                        <button type="submit" className="btn btn-primary btn-sm">
                            Send
                        </button>
                    </form>
                </div>
            )}

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-primary"
                style={{
                    borderRadius: '50px',
                    padding: '0.85rem 1.25rem',
                    boxShadow: '0 4px 20px rgba(0, 245, 212, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <span style={{ fontSize: '1.3rem' }}>💬</span>
                <span style={{ fontSize: '0.9rem' }}>Ask AI Helper</span>
            </button>
        </div>
    );
};

export default AIChatWidget;
