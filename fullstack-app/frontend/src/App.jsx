import React, { useState, useEffect } from 'react';
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
            map.setView(position, map.getZoom());
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
            position: fixed;
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
            position: fixed;
            top: 20px;
            right: 24px;
            z-index: 3000;
        }
    }
`;


function App() {




    const [currentPosition, setCurrentPosition] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // Hide all Leaflet controls when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('leaflet-hide-controls');
        } else {
            document.body.classList.remove('leaflet-hide-controls');
        }
    }, [menuOpen]);

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

    // Profile state for icon color and name
    const [profile, setProfile] = useState({
        name: '',
        color: '#009fe3',
    });
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    // Set default name to a random Finnish president on first render
    useEffect(() => {
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
    const fontAwesomeIcon = new L.DivIcon({
        html: `<i class="fa-solid fa-person" style="color:${profile.color};font-size:2rem;text-shadow:0 0 8px #fff, 0 0 12px #fff;"></i>`,
        iconSize: [32, 32],
        className: 'fa-marker-icon',
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });


    useEffect(() => {
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

    return (
        <>
            <style>{menuHoverStyle}</style>
            <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f5f7fa', minHeight: '100vh', overflow: 'hidden' }}>
                <header style={{ background: '#009fe3', color: '#fff', padding: '8px', boxShadow: '0 6px 24px 0 rgba(0,0,0,0.18)', borderBottom: '1px solid #007bb8', zIndex: 1000, position: 'relative' }}>
                    <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 3001 }}>
                            <img src={veologo} alt="VEO Logo" style={{ height: 48, width: 'auto', display: 'block', background: '#fff', padding: 4, borderRadius: 8, boxShadow: '0 1.5px 8px 0 rgba(0,0,0,0.13)' }} />
                            <span className="powerpulse-title" style={{ fontSize: 36, fontWeight: 700, letterSpacing: 2, fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif' }}>PowerPulse</span>
                        </div>
                        <nav style={{ position: 'relative' }}>
                            <div className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen((open) => !open)}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <ul
                                className={`powerpulse-menu${menuOpen ? ' open' : ''}`}
                                style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0, fontSize: 18 }}
                                onClick={() => setMenuOpen(false)}
                            >
                                <li style={{ cursor: 'pointer' }}>Dashboard</li>
                                <li style={{ cursor: 'pointer' }}>Analytics</li>
                                <li style={{ cursor: 'pointer' }}>Settings</li>
                                <li style={{ cursor: 'pointer' }} onClick={e => {setProfileMenuOpen(v => !v); }}>Profile</li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <div style={{ width: '100%', height: 'calc(100vh - 73px)', margin: 0, padding: 0, overflow: 'hidden' }}>
                    <MapContainer center={currentPosition || [60.1699, 24.9384]} zoom={12} style={{ width: '100%', height: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {currentPosition && (
                            <>
                                <SetViewToCurrentLocation position={currentPosition} />
                                <Marker position={currentPosition} icon={fontAwesomeIcon}>
                                    <Popup>{'You: ' + profile.name}</Popup>
                                </Marker>
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
                            <span style={{ fontSize: 16, color: '#333', flex: 1 }}>{profile.email || 'your@email.com'}</span>
                            <button style={{ padding: '6px 14px', background: '#e6f4fa', color: '#009fe3', border: 'none', borderRadius: 5, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Change Email</button>
                        </div>
                    </div>
                    <div style={{ marginBottom: 18 }}>
                        <button style={{ width: '100%', padding: '10px 0', background: '#e6f4fa', color: '#009fe3', border: 'none', borderRadius: 6, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Change Password</button>
                    </div>
                    <div style={{ marginBottom: 18 }}>
                        <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Marker color</label>
                        <input
                            type="color"
                            value={profile.color}
                            onChange={e => setProfile(p => ({ ...p, color: e.target.value }))}
                            style={{ width: 40, height: 40, border: 'none', background: 'none', verticalAlign: 'middle', cursor: 'pointer' }}
                        />
                    </div>
                    <button style={{ width: '100%', padding: '10px 0', background: '#009fe3', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>
                        Save Changes
                    </button>
                </div>
            )}
                            </>
                        )}
                    </MapContainer>
                </div>
            </div>
        </>
    );
}

export default App;