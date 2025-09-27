


import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import veologo from './veologo.png';

// Add a style tag for menu hover effect
const menuHoverStyle = `
    .powerpulse-menu li {
        color: #fff;
        opacity: 0.85;
        transition: text-decoration 0.2s, opacity 0.2s;
    }
    .powerpulse-menu li:hover {
        text-decoration: underline;
        color: #fff;
        opacity: 1;
    }
`;


function App() {
    return (
        <>
            <style>{menuHoverStyle}</style>
            <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f5f7fa', minHeight: '100vh', overflow: 'hidden' }}>
            <header style={{ background: '#009fe3', color: '#fff', padding: '8px 0', boxShadow: '0 4px 18px 0 rgba(0,0,0,0.10)', borderBottom: '1px solid #007bb8', zIndex: '69' }}>
                <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <img src={veologo} alt="VEO Logo" style={{ height: 48, width: 'auto', display: 'block', background: '#fff', padding: 4, borderRadius: 8, boxShadow: '0 1.5px 8px 0 rgba(0,0,0,0.13)' }} />
                        <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: 2, fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif' }}>PowerPulse</span>
                    </div>
                    <nav>
                        <ul className="powerpulse-menu" style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0, fontSize: 18 }}>
                            <li style={{ cursor: 'pointer' }}>Dashboard</li>
                            <li style={{ cursor: 'pointer' }}>Analytics</li>
                            <li style={{ cursor: 'pointer' }}>Settings</li>
                            <li style={{ cursor: 'pointer' }}>Profile</li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div style={{ width: '100%', height: 'calc(100vh - 73px)', margin: 0, padding: 0, overflow: 'hidden' }}>
                <MapContainer center={[60.1699, 24.9384]} zoom={12} style={{ width: '100%', height: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
            </div>
        </>
    );
}

export default App;