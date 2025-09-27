import { useMapEvent } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import L from 'leaflet';
import SetViewToCurrentLocation from './SetViewToCurrentLocation';

function MapView({
    fabOpen,
    setFabOpen,
    currentPosition,
    setCurrentPosition,
    menuOpen,
    profile,
    setProfile,
    profileMenuOpen,
    setProfileMenuOpen,
    setShowSiteDialog: setShowSiteDialogProp
}) {
    // Component to handle map clicks for site location selection
    function MapClickHandler() {
        useMapEvent('click', (e) => {
            if (showSiteDialog) {
                setNewSite(s => ({ ...s, location: [e.latlng.lat, e.latlng.lng] }));
            }
        });
        return null;
    }
    // Sites state: array of { name, location: [lat, lng], online, inService }
    const [sites, setSites] = useState([]);
    const [showSiteDialog, setShowSiteDialog] = useState(false);
    // Expose setShowSiteDialog to parent for global control
    React.useEffect(() => {
        if (typeof setShowSiteDialogProp === 'function') {
            setShowSiteDialogProp(setShowSiteDialog);
        }
    }, [setShowSiteDialogProp]);
    const [newSite, setNewSite] = useState({
        name: '',
        location: null,
        online: true,
        inService: false
    });

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
            onClick={() => { if(fabOpen){setFabOpen(false);} if(profileMenuOpen){setProfileMenuOpen(false);} }}
        >
            <MapContainer
                center={currentPosition || [60.1699, 24.9384]}
                zoom={12}
                style={{ width: '100%', height: '100%' }}
            >
                <MapClickHandler />
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
                {/* Render all sites as markers */}
                {sites.map((site, idx) => (
                    <Marker
                        key={`site-${idx}`}
                        position={site.location}
                        icon={new L.DivIcon({
                            html: `<i class='fa-solid fa-building' style='color:${site.online ? '#009fe3' : '#aaa'};font-size:1.7rem;text-shadow:0 0 8px #fff, 0 0 12px #fff;'></i>` + (site.inService ? `<span style='position:absolute;top:-8px;right:-8px;font-size:1.1rem;color:#fbc02d;' title='In Service'><i class='fa-solid fa-wrench'></i></span>` : ''),
                            iconSize: [32, 32],
                            className: 'fa-marker-icon',
                            iconAnchor: [16, 32],
                            popupAnchor: [0, -32]
                        })}
                    >
                        <Popup>
                            <div>
                                <strong>Site: {site.name}</strong><br/>
                                Status: <span style={{color: site.online ? '#009fe3' : '#aaa'}}>{site.online ? 'Online' : 'Offline'}</span><br/>
                                {site.inService && <span style={{color:'#fbc02d'}}>In Service</span>}
                            </div>
                        </Popup>
                    </Marker>
                ))}
                {/* Show a marker for the new site location while picking */}
                {showSiteDialog && newSite.location && (
                    <Marker
                        position={newSite.location}
                        icon={new L.DivIcon({
                            html: `<i class='fa-solid fa-location-dot' style='color:#fbc02d;font-size:2rem;text-shadow:0 0 8px #fff, 0 0 12px #fff;'></i>`,
                            iconSize: [32, 32],
                            className: 'fa-marker-icon',
                            iconAnchor: [16, 32],
                            popupAnchor: [0, -32]
                        })}
                    >
                        <Popup>Selected site location</Popup>
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
                        onClick={() => {
                            setFabOpen(false);
                            setNewSite({
                                name: '',
                                location: currentPosition || [60.1699, 24.9384],
                                online: true,
                                inService: false
                            });
                            setShowSiteDialog(true);
                        }}
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
            {/* New Site Dialog */}
            {showSiteDialog && (
                <div style={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    zIndex: 5000,
                    pointerEvents: 'none', // allow map to be clickable
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: 14,
                        boxShadow: '0 4px 24px rgba(44,83,100,0.18)',
                        padding: 28,
                        minWidth: 320,
                        maxWidth: 380,
                        position: 'relative',
                        pointerEvents: 'auto', // dialog itself is interactive
                    }}>
                        <button onClick={() => setShowSiteDialog(false)} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', fontSize: 22, color: '#009fe3', cursor: 'pointer', fontWeight: 700, lineHeight: 1 }} aria-label="Close">&times;</button>
                        <h2 style={{ margin: '0 0 18px 0', fontSize: 22, color: '#009fe3', fontWeight: 700 }}>Add New Site</h2>
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Name</label>
                            <input
                                type="text"
                                value={newSite.name}
                                onChange={e => setNewSite(s => ({ ...s, name: e.target.value }))}
                                style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: '95%', fontSize: 16 }}
                                placeholder="Site name"
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Location</label>
                            <input
                                type="text"
                                value={newSite.location ? newSite.location.join(', ') : ''}
                                readOnly
                                style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: '95%', fontSize: 16, background: '#f7f7f7' }}
                            />
                            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                                <button
                                    style={{ background: '#e6f4fa', color: '#009fe3', border: 'none', borderRadius: 5, fontWeight: 600, cursor: 'pointer', fontSize: 14, padding: '6px 14px' }}
                                    onClick={() => {
                                        if (currentPosition) setNewSite(s => ({ ...s, location: currentPosition }));
                                    }}
                                >Use my location</button>
                                <span style={{ fontSize: 14, color: '#666', alignSelf: 'center' }}>or click on the map</span>
                            </div>
                        </div>
                        <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
                            <label style={{ fontWeight: 500 }}>
                                <input type="checkbox" checked={newSite.online} onChange={e => setNewSite(s => ({ ...s, online: e.target.checked }))} /> Online
                            </label>
                            <label style={{ fontWeight: 500 }}>
                                <input type="checkbox" checked={newSite.inService} onChange={e => setNewSite(s => ({ ...s, inService: e.target.checked }))} /> In Service
                            </label>
                        </div>
                        <button
                            style={{ width: '100%', padding: '10px 0', background: '#009fe3', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}
                            disabled={!newSite.name || !newSite.location}
                            onClick={() => {
                                setSites(sites => [...sites, { ...newSite }]);
                                setShowSiteDialog(false);
                            }}
                        >Add Site</button>
                    </div>
                </div>
            )}
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
