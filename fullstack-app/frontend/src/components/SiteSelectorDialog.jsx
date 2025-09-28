import React from 'react';

export default function SiteSelectorDialog({ sites, onSelect, onCancel }) {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999,
            background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.18)', padding: 32, minWidth: 320 }}>
                <h3 style={{ marginTop: 0 }}>Select site for new asset</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: 300, overflowY: 'auto' }}>
                    {sites.length === 0 && <li>No sites available</li>}
                    {sites.map((site, idx) => (
                        <li key={site.id || site.name} style={{ marginBottom: 10 }}>
                            <button style={{ width: '100%', textAlign: 'left', padding: 10, borderRadius: 6, border: '1px solid #009fe3', background: '#f7fbff', color: '#009fe3', fontWeight: 600, cursor: 'pointer' }}
                                onClick={() => onSelect(idx)}>
                                {site.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <button style={{ marginTop: 18, background: '#eee', color: '#333', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}
