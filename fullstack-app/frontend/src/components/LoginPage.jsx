import React, { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    setError('');
    onLogin(email);
  };

  // Offset for header height (64px)
  return (
    <div style={{
      position: 'absolute',
      top: 73,
      left: 0,
      width: '100vw',
      height: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f7fbff',
      fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif',
      zIndex: 10
    }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.13)', minWidth: 320, maxWidth: 360, width: '100%' }}>
        <h2 style={{ marginTop: 0, marginBottom: 24, color: '#009fe3', fontWeight: 700 }}>Login</h2>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
        </div>
  <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
        </div>
        {error && <div style={{ color: '#e53935', marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', padding: '10px 0', background: '#009fe3', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, fontWeight: 600, cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
}
