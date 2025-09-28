import React from 'react';

export default function ProfileMenu({
    profileMenuOpen,
    setProfileMenuOpen,
    profile,
    setProfile,
    markerColor,
    onLogout
}) {
    if (!profileMenuOpen) return null;
    return (
        <div
            className="profile-menu-fullscreen"
            style={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 4000,
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 4px 24px rgba(44,83,100,0.18)',
                padding: 32,
                minWidth: 320,
                maxWidth: 380,
                cursor: 'default'
            }}
            onClick={e => e.stopPropagation()}
        >
            <button onClick={() => setProfileMenuOpen(false)} style={{ position: 'absolute', top: 14, right: 14, background: 'none', border: 'none', fontSize: 22, color: '#009fe3', cursor: 'pointer', fontWeight: 700, lineHeight: 1 }} aria-label="Close profile menu">&times;</button>
            <h2 style={{ margin: '0 0 18px 0', fontSize: 24, color: '#009fe3', fontWeight: 700 }}>Profile</h2>
            <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Name</label>
                <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: '95%', fontSize: 16 }}
                />
            </div>
            <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Email</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 16, color: '#333', flex: 1 }}>{profile.name.split(' ')[0].toLowerCase()+'@veo.fi'}</span>
                    <button style={{ padding: '6px 14px', background: '#e6f4fa', color: '#009fe3', border: 'none', borderRadius: 5, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Change Email</button>
                </div>
            </div>
            <div style={{ marginBottom: 18 }}>
                <button style={{ width: '100%', padding: '10px 0', background: '#e6f4fa', color: '#009fe3', border: 'none', borderRadius: 6, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Change Password</button>
            </div>
            <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Marker color</label>
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={profile.hue}
                    onChange={e => setProfile(p => ({ ...p, hue: Number(e.target.value) }))}
                    style={{
                        width: 120,
                        verticalAlign: 'middle',
                        cursor: 'pointer',
                        accentColor: markerColor,
                        background: `linear-gradient(90deg, hsl(0,85%,48%) 0%, hsl(360,85%,48%) 100%)`,
                        borderRadius: 6,
                        height: 8,
                        outline: 'none',
                        border: '1px solid #ccc',
                    }}
                />
            </div>
            <button
                style={{ width: '100%', padding: '10px 0', background: '#009fe3', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}
                onClick={() => setProfileMenuOpen(false)}
            >
                Save Changes
            </button>
            <button
                style={{ width: '100%', padding: '10px 0', background: '#e53935', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, fontWeight: 600, cursor: 'pointer', marginTop: 12 }}
                onClick={onLogout}
            >
                Log out
            </button>
        </div>
    );
}
