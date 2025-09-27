import React, { useState, useEffect } from 'react';
// For charts
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// AnalyticsPage component must be outside App
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import L from 'leaflet';
import veologo from './veologo.png';

// Component to update map center to current location
function SetViewToCurrentLocation({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, map.getZoom(), { animate: true });
        }
    }, [position, map]);
    return null;
}

// Add a style tag for menu hover effect
const menuHoverStyle = `
    @media (max-width: 600px) {
        .powerpulse-title {
            display: none !important;
        }
        .profile-menu-fullscreen {
            position: fixed !important;
            position: fixed !important;
            top: 73px !important; /* header height (smaller screens) */
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            height: calc(100vh - 73px) !important;
            min-width: unset !important;
            max-width: unset !important;
            border-radius: 0 !important;
            padding: 32px 12px 24px 12px !important;
            box-shadow: none !important;
            z-index: 4000 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            overflow-y: auto !important;
        }
    }
    .leaflet-hide-controls .leaflet-control-container {
        display: none !important;
    }
    .hamburger {
        display: none;
        flex-direction: column;
        justify-content: center;
        width: 32px;
        height: 32px;
        cursor: pointer;
        z-index: 1100;
        position: relative;
    }
    .hamburger span {
        height: 4px;
        width: 100%;
        background: #fff;
        position: absolute;
        left: 0;
        border-radius: 2px;
        transition: 0.3s cubic-bezier(.4,2,.6,1), background 0.2s;
    }
    .hamburger span:nth-child(1) {
        top: 4px;
    }
    .hamburger span:nth-child(2) {
        top: 14px;
    }
    .hamburger span:nth-child(3) {
        top: 24px;
    }
    .hamburger.open span:nth-child(1) {
        transform: translateY(10px) rotate(45deg);
    }
    .hamburger.open span:nth-child(2) {
        opacity: 0;
    }
    .hamburger.open span:nth-child(3) {
        transform: translateY(-10px) rotate(-45deg);
    }
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
    .hamburger {
        display: none;
        flex-direction: column;
        justify-content: center;
        width: 32px;
        height: 32px;
        cursor: pointer;
        z-index: 1100;
    }
    .hamburger span {
        height: 2px !important;
        width: 100%;
        background: #fff;
        margin: 4px 0;
        border-radius: 2px;
        transition: 0.3s;
    }
    @media (max-width: 1000px) {
        .powerpulse-menu {
            display: flex !important;
            position: fixed !important;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #009fe3;
            box-shadow: none;
            border-radius: 0;
            padding: 0;
            flex-direction: column;
            gap: 40px !important;
            min-width: unset;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            font-size: 2.2rem !important;
            opacity: 0;
            pointer-events: none;
            visibility: hidden;
            transform: scale(0.98) translateY(30px);
            transition: opacity 0.35s cubic-bezier(.4,2,.6,1), transform 0.35s cubic-bezier(.4,2,.6,1), visibility 0s linear 0.35s;
        }
        .powerpulse-menu.open {
            opacity: 1;
            pointer-events: auto;
            visibility: visible;
            transform: scale(1) translateY(0);
            transition: opacity 0.35s cubic-bezier(.4,2,.6,1), transform 0.35s cubic-bezier(.4,2,.6,1), visibility 0s;
        }
        .hamburger {
            display: flex;
            z-index: 3000;
            margin-right: 20px;
            margin-left: 10px;
        }
    }
`;


function AnalyticsPage() {
    // Dummy data
    const metrics = [
        { label: 'Total Energy Consumption', value: '12,500 kWh' },
        { label: 'Peak Demand', value: '2,100 kW' },
        { label: 'CO₂ Emissions', value: '3,200 kg' },
        { label: 'Renewable Usage', value: '68%' },
        { label: 'System Uptime', value: '99.98%' },
    ];

    const timeSeries = [
        { time: '00:00', usage: 200 }, { time: '04:00', usage: 350 }, { time: '08:00', usage: 600 },
        { time: '12:00', usage: 900 }, { time: '16:00', usage: 1200 }, { time: '20:00', usage: 800 }, { time: '24:00', usage: 400 }
    ];
    const barData = [
        { name: 'Site A', value: 4000 },
        { name: 'Site B', value: 3000 },
        { name: 'Site C', value: 2000 },
        { name: 'Site D', value: 2780 },
        { name: 'Site E', value: 1890 },
    ];
    const pieData = [
        { name: 'Solar', value: 400 },
        { name: 'Wind', value: 300 },
        { name: 'Grid', value: 300 },
        { name: 'Battery', value: 200 },
    ];
    const alerts = [
        { time: '2025-09-27 10:12', message: 'Peak demand threshold exceeded', severity: 'High' },
        { time: '2025-09-27 09:45', message: 'Device B offline', severity: 'Medium' },
        { time: '2025-09-27 08:30', message: 'CO₂ emissions above target', severity: 'Low' },
    ];
    const topConsumers = [
        { device: 'Pump 1', usage: 3200 },
        { device: 'Compressor', usage: 2100 },
        { device: 'Lighting', usage: 1800 },
    ];
    const efficiency = [
        { name: 'Pump 1', actual: 90, expected: 95 },
        { name: 'Compressor', actual: 80, expected: 90 },
        { name: 'Lighting', actual: 98, expected: 97 },
    ];
    const forecast = [
        { day: 'Mon', usage: 1200 },
        { day: 'Tue', usage: 1300 },
        { day: 'Wed', usage: 1100 },
        { day: 'Thu', usage: 1400 },
        { day: 'Fri', usage: 1500 },
        { day: 'Sat', usage: 900 },
        { day: 'Sun', usage: 800 },
    ];
    const trend = [
        { month: 'Jan', usage: 9000 },
        { month: 'Feb', usage: 8500 },
        { month: 'Mar', usage: 9500 },
        { month: 'Apr', usage: 10000 },
        { month: 'May', usage: 11000 },
        { month: 'Jun', usage: 12000 },
    ];

    const pieColors = ['#009fe3', '#00c49f', '#ffbb28', '#ff8042'];

    return (
        <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Analytics Dashboard</h1>
            {/* Key Metrics */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
                {metrics.map(m => (
                    <div key={m.label} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 24, minWidth: 180, flex: 1 }}>
                        <div style={{ fontSize: 18, color: '#009fe3', fontWeight: 600 }}>{m.label}</div>
                        <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>{m.value}</div>
                    </div>
                ))}
            </div>
            {/* Charts */}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
                <div style={{ flex: 2, minWidth: 320, background: '#fff', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Energy Usage (24h)</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={timeSeries}>
                            <XAxis dataKey="time" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Line type="monotone" dataKey="usage" stroke="#009fe3" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Energy Source Breakdown</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                                {pieData.map((entry, idx) => (
                                    <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Top Sites</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#009fe3" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {/* Alerts & Anomalies */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 32 }}>
                <div style={{ fontWeight: 600, marginBottom: 12 }}>Recent Alerts</div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {alerts.map(a => (
                        <li key={a.time + a.message} style={{ marginBottom: 8, color: a.severity === 'High' ? '#e53935' : a.severity === 'Medium' ? '#ffb300' : '#009fe3', fontWeight: 500 }}>
                            [{a.time}] {a.message} <span style={{ fontSize: 13, color: '#888', fontWeight: 400 }}>({a.severity})</span>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Device/Asset Analytics */}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
                <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Top Consumers</div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                        {topConsumers.map(tc => (
                            <li key={tc.device} style={{ marginBottom: 6 }}>{tc.device}: <b>{tc.usage} kWh</b></li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Efficiency Scores</div>
                    <table style={{ width: '100%', fontSize: 15 }}>
                        <thead>
                            <tr><th align="left">Device</th><th>Actual</th><th>Expected</th></tr>
                        </thead>
                        <tbody>
                            {efficiency.map(e => (
                                <tr key={e.name}><td>{e.name}</td><td>{e.actual}%</td><td>{e.expected}%</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Trends & Forecasts */}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
                <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Predicted Usage (This Week)</div>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={forecast}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="usage" fill="#00c49f" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Monthly Trend</div>
                    <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={trend}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Line type="monotone" dataKey="usage" stroke="#ff8042" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {/* Custom Filters (static UI) */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 32 }}>
                <div style={{ fontWeight: 600, marginBottom: 12 }}>Filters</div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <input type="date" style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
                    <select style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}>
                        <option>All Devices</option>
                        <option>Pump 1</option>
                        <option>Compressor</option>
                        <option>Lighting</option>
                    </select>
                    <select style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}>
                        <option>All Metrics</option>
                        <option>Usage</option>
                        <option>Efficiency</option>
                        <option>Emissions</option>
                    </select>
                </div>
            </div>
            {/* Export & Sharing (static UI) */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 32 }}>
                <div style={{ fontWeight: 600, marginBottom: 12 }}>Export & Sharing</div>
                <button style={{ padding: '8px 18px', background: '#009fe3', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, marginRight: 12 }}>Download PDF</button>
                <button style={{ padding: '8px 18px', background: '#00c49f', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600 }}>Share Dashboard</button>
            </div>
        </div>
    );
}

function App() {
    // FAB state for map
    const [fabOpen, setFabOpen] = React.useState(false);
    const [currentPosition, setCurrentPosition] = React.useState(null);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [page, setPage] = React.useState('map');
    // List of Finnish presidents
    const finnishPresidents = [
        'Kaarlo Juho Ståhlberg',
        'Lauri Kristian Relander',
        'Pehr Evind Svinhufvud',
        'Kyösti Kallio',
        'Risto Ryti',
        'Carl Gustaf Emil Mannerheim',
        'Juho Kusti Paasikivi',
        'Urho Kekkonen',
        'Mauno Koivisto',
        'Martti Ahtisaari',
        'Tarja Halonen',
        'Sauli Niinistö',
        'Alexander Stubb'
    ];
    // Profile state for icon color (hue) and name
    const [profile, setProfile] = React.useState({
        name: '',
        hue: 200, // default hue (blue)
    });
    const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
    // Set default name to a random Finnish president on first render
    React.useEffect(() => {
        setProfile(p => {
            if (!p.name) {
                const randomPresident = finnishPresidents[Math.floor(Math.random() * finnishPresidents.length)];
                return { ...p, name: randomPresident };
            }
            return p;
        });
        // eslint-disable-next-line
    }, []);
    // Custom FontAwesome person marker icon (fa-person)
    const markerColor = `hsl(${profile.hue}, 85%, 48%)`;
    const fontAwesomeIcon = new L.DivIcon({
        html: `<i class="fa-solid fa-person" style="color:${markerColor};font-size:2rem;text-shadow:0 0 8px #fff, 0 0 12px #fff;"></i>`,
        iconSize: [32, 32],
        className: 'fa-marker-icon',
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
    // Hide all Leaflet controls when menu is open
    React.useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('leaflet-hide-controls');
        } else {
            document.body.classList.remove('leaflet-hide-controls');
        }
    }, [menuOpen]);
    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setCurrentPosition([pos.coords.latitude, pos.coords.longitude]);
                },
                () => {},
                { enableHighAccuracy: true }
            );
        }
    }, []);
    // Set overflowY: auto only for analytics page, otherwise hidden
    const mainDivStyle = {
        fontFamily: 'Segoe UI, Arial, sans-serif',
        background: '#f5f7fa',
        minHeight: '100vh',
        overflow: 'hidden',
    };
    const analyticsContainerStyle = {
        height: 'calc(100vh - 73px)', // 73px = header height
        overflowY: 'auto',
    };
    return (
        <>
            <style>{menuHoverStyle}</style>
            <div style={mainDivStyle}>
                <header style={{ background: '#009fe3', color: '#fff', padding: '8px', boxShadow: '0 6px 24px 0 rgba(0,0,0,0.18)', borderBottom: '1px solid #007bb8', zIndex: 1000, position: 'relative', appRegion: 'drag', textSelect: 'none' }}>
                    <div style={{ margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                        <div className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen((open) => !open)} style={{ appRegion: 'no-drag' }}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 3001 }}>
                            <img src={veologo} alt="VEO Logo" style={{ height: 48, width: 'auto', display: 'block', background: '#fff', padding: 4, borderRadius: 8, boxShadow: '0 1.5px 8px 0 rgba(0,0,0,0.13)' }} />
                            <span className="powerpulse-title" style={{ fontSize: 36, fontWeight: 700, letterSpacing: 2, fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', marginRight: 20 }}>PowerPulse</span>
                        </div>
                        <nav style={{ position: 'relative' }}>
                            <ul
                                className={`powerpulse-menu${menuOpen ? ' open' : ''}`}
                                style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0, fontSize: 18, appRegion: 'no-drag', position: 'relative', top: 5 }}
                                onClick={() => setMenuOpen(false)}
                            >
                                <li
                                    style={{
                                        cursor: 'pointer',
                                        fontWeight: page === 'map' ? 700 : 400,
                                        opacity: page === 'map' ? 1 : 0.85
                                    }}
                                    onClick={() => setPage('map')}
                                >
                                    Map
                                </li>
                                <li
                                    style={{
                                        cursor: 'pointer',
                                        fontWeight: page === 'analytics' ? 700 : 400,
                                        opacity: page === 'analytics' ? 1 : 0.85
                                    }}
                                    onClick={() => setPage('analytics')}
                                >
                                    Analytics
                                </li>
                                <li style={{ cursor: 'pointer' }}>Settings</li>
                                <li
                                    style={{ cursor: 'pointer' }}
                                    onClick={e => {
                                        setPage('map');
                                        setProfileMenuOpen(true);
                                    }}
                                >
                                    Profile
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                                {page === 'map' && (
                                    // ...existing code...
                                    <div
                                        key={`dashboard-map-${page}-${currentPosition ? currentPosition.join('-') : 'default'}`}
                                        style={{ width: '100%', height: 'calc(100vh - 73px)', margin: 0, padding: 0, overflow: 'hidden', position: 'relative' }}
                                        
                        onPointerDown={() => { if(fabOpen){setFabOpen(false);} if(profileMenuOpen){setProfileMenuOpen(false);} }}
                                    >
                    <MapContainer
                        center={currentPosition || [60.1699, 24.9384]}
                        zoom={12}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <SetViewToCurrentLocation position={currentPosition} />
                        {currentPosition && (
                            <Marker position={currentPosition} icon={fontAwesomeIcon}>
                                <Popup>{'You: ' + profile.name}</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                    {/* Floating Action Button (FAB) for new site/asset */}
                    <div style={{ position: 'absolute', left: 24, bottom: 32, zIndex: 4100 }}>
                        <button
                            aria-label="Add"
                            onClick={() => setFabOpen(fab => !fab)}
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: '50%',
                                background: '#009fe3',
                                color: '#fff',
                                border: 'none',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                                fontSize: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'background 0.2s',
                            }}
                        >
                            <span style={{ fontWeight: 700, fontSize: 36, lineHeight: 1 }}>+</span>
                        </button>
                        {fabOpen && (
                            <div style={{
                                position: 'absolute',
                                left: 0,
                                bottom: 70,
                                background: '#fff',
                                borderRadius: 10,
                                boxShadow: '0 2px 12px rgba(0,0,0,0.13)',
                                padding: '8px 0',
                                minWidth: 120,
                            }}>
                                <button style={{
                                    width: '100%',
                                    background: 'none',
                                    border: 'none',
                                    color: '#009fe3',
                                    fontWeight: 600,
                                    fontSize: 17,
                                    padding: '10px 18px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #e0e0e0',
                                    outline: 'none',
                                }}
                                onClick={() => { setFabOpen(false); alert('New site clicked!'); }}
                                >New site</button>
                                <button style={{
                                    width: '100%',
                                    background: 'none',
                                    border: 'none',
                                    color: '#009fe3',
                                    fontWeight: 600,
                                    fontSize: 17,
                                    padding: '10px 18px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                                onClick={() => { setFabOpen(false); alert('New asset clicked!'); }}
                                >New asset</button>
                            </div>
                        )}
                    </div>
                    {/* Profile section for configuring icon color and name */}
                    {profileMenuOpen && (
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
                                        accentColor: markerColor, // for modern browsers
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
                        </div>
                    )}
                  </div>
                )}
                                {page === 'analytics' && (
                                    <div style={analyticsContainerStyle}>
                                        <AnalyticsPage />
                                    </div>
                                )}
            </div>
        </>
    );
}

export default App;