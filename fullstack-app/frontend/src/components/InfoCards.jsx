import React, { useEffect, useState } from 'react';

export default function InfoCards({ currentPosition }) {
    const [sites, setSites] = useState([]);
    const [assets, setAssets] = useState([]);
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    // Load all data on mount
    useEffect(() => {
        fetch('/api/sites').then(res => res.json()).then(setSites);
        fetch('/api/assets').then(res => res.json()).then(setAssets);
        fetch('/api/users').then(res => res.json()).then(setUsers);
    }, []);

    // Helper: distance in meters between two [lat, lng] points
    function getDistance(a, b) {
        if (!a || !b) return Infinity;
        const toRad = x => x * Math.PI / 180;
        const R = 6371e3;
        const [lat1, lon1] = a;
        const [lat2, lon2] = b;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const aa = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
        return 2 * R * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));
    }

    // Filter nearby (within 1km) assets and users
    const nearbySites = sites.filter(site => getDistance(currentPosition, site.location) < 1000);
    // For demo, all assets and users are shown; you can filter by location if available

    return (
        <div style={{ position: 'absolute', top: 80, right: 24, zIndex: 4200, width: 340, maxHeight: '80vh', overflowY: 'auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.13)', padding: 18 }}>
            <h3 style={{ margin: 0, marginBottom: 12, color: '#009fe3' }}>Nearby Information</h3>
            {nearbySites.map(site => (
                <div key={site.id} style={{ borderBottom: '1px solid #eee', marginBottom: 12, paddingBottom: 10 }}>
                    <strong>Site: {site.name}</strong><br/>
                    Status: <span style={{color: site.online ? '#009fe3' : '#aaa'}}>{site.online ? 'Online' : 'Offline'}</span><br/>
                    {site.inService && <span style={{color:'#fbc02d'}}>In Service</span>}<br/>
                    {site.assets && site.assets.length > 0 && (
                        <div style={{ margin: '8px 0 0 0' }}>
                            <strong>Assets:</strong>
                            <ul style={{ paddingLeft: 18, margin: 0 }}>
                                {site.assets.map((asset, i) => (
                                    <li key={i} style={{ marginBottom: 4 }}>
                                        <span style={{ fontWeight: 600 }}>{asset.name}</span> (ID: {asset.id})<br/>
                                        {asset.image && <img src={asset.image} alt="Asset" style={{ maxWidth: 40, maxHeight: 28, borderRadius: 3, marginTop: 2 }} />}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button style={{marginTop:8,background:'#009fe3',color:'#fff',border:'none',borderRadius:5,padding:'4px 12px',cursor:'pointer'}} onClick={() => setSelected(site)}>View</button>
                    <button style={{marginTop:8,marginLeft:8,background:'#fbc02d',color:'#fff',border:'none',borderRadius:5,padding:'4px 12px',cursor:'pointer'}} onClick={() => setShowFeedback(site.id)}>Feedback</button>
                </div>
            ))}
            {/* Feedback dialog */}
            {showFeedback && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#fff', borderRadius: 10, padding: 24, minWidth: 320 }}>
                        <h4 style={{ margin: 0, marginBottom: 10 }}>Submit Feedback</h4>
                        <textarea value={feedback} onChange={e => setFeedback(e.target.value)} style={{ width: '100%', minHeight: 60, borderRadius: 6, border: '1px solid #ccc', padding: 8 }} placeholder="Your feedback..." />
                        <div style={{ marginTop: 12, textAlign: 'right' }}>
                            <button style={{ background: '#009fe3', color: '#fff', border: 'none', borderRadius: 5, padding: '6px 18px', fontWeight: 600, marginRight: 8 }} onClick={() => setShowFeedback(false)}>Cancel</button>
                            <button style={{ background: '#fbc02d', color: '#fff', border: 'none', borderRadius: 5, padding: '6px 18px', fontWeight: 600 }} onClick={() => { alert('Feedback submitted!'); setShowFeedback(false); setFeedback(''); }}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Info card dialog */}
            {selected && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#fff', borderRadius: 10, padding: 24, minWidth: 320 }}>
                        <h4 style={{ margin: 0, marginBottom: 10 }}>Site Information</h4>
                        <div><strong>Name:</strong> {selected.name}</div>
                        <div><strong>Status:</strong> {selected.online ? 'Online' : 'Offline'}</div>
                        <div><strong>In Service:</strong> {selected.inService ? 'Yes' : 'No'}</div>
                        {selected.assets && selected.assets.length > 0 && (
                            <div style={{ margin: '8px 0 0 0' }}>
                                <strong>Assets:</strong>
                                <ul style={{ paddingLeft: 18, margin: 0 }}>
                                    {selected.assets.map((asset, i) => (
                                        <li key={i} style={{ marginBottom: 4 }}>
                                            <span style={{ fontWeight: 600 }}>{asset.name}</span> (ID: {asset.id})<br/>
                                            {asset.image && <img src={asset.image} alt="Asset" style={{ maxWidth: 40, maxHeight: 28, borderRadius: 3, marginTop: 2 }} />}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div style={{ marginTop: 16, textAlign: 'right' }}>
                            <button style={{ background: '#009fe3', color: '#fff', border: 'none', borderRadius: 5, padding: '6px 18px', fontWeight: 600 }} onClick={() => setSelected(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
