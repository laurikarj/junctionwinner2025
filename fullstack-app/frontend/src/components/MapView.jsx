import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import L from 'leaflet';
import SetViewToCurrentLocation from './SetViewToCurrentLocation';
import veologo from '../veologo.png';

function MapView({
    fabOpen,
    setFabOpen,
    currentPosition,
    setCurrentPosition,
    menuOpen,
    profile,
    setProfile,
    profileMenuOpen,
    setProfileMenuOpen
}) {
    // Custom FontAwesome person marker icon (fa-person)
    const markerColor = `hsl(${profile.hue}, 85%, 48%)`;
    const fontAwesomeIcon = new L.DivIcon({
        html: `<i class="fa-solid fa-person" style="color:${markerColor};font-size:2rem;text-shadow:0 0 8px #fff, 0 0 12px #fff;"></i>`,
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
    }, [setCurrentPosition]);
    return (
        <div
            key={`dashboard-map-${currentPosition ? currentPosition.join('-') : 'default'}`}
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
    );
}

export default MapView;
