import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import L from 'leaflet';
import SetViewToCurrentLocation from './SetViewToCurrentLocation';
import MapClickHandler from './MapClickHandler';
import SiteMarkers from './SiteMarkers';
import NewSiteDialog from './NewSiteDialog';
import ProfileMenu from './ProfileMenu';


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
    const [sites, setSites] = useState([]);
    const [editSiteIdx, setEditSiteIdx] = useState(null);
    const [editSite, setEditSite] = useState(null);

    // Load sites from backend on mount
    useEffect(() => {
        fetch('/api/sites')
            .then(res => res.json())
            .then(data => setSites(data))
            .catch(() => setSites([]));
    }, []);

    // Helper to add a site to backend
    const addSite = async (site) => {
        const res = await fetch('/api/sites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(site)
        });
        if (res.ok) {
            const newSite = await res.json();
            setSites(sites => [...sites, newSite]);
        }
    };

    // Helper to update a site in backend
    const updateSite = async (idx, site) => {
        const res = await fetch(`/api/sites/${idx}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(site)
        });
        if (res.ok) {
            const updated = await res.json();
            setSites(sites => sites.map((s, i) => i === idx ? updated : s));
        }
    };
    const [showSiteDialog, setShowSiteDialog] = useState(false);
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
    // Only set crosshair cursor on the map area, not the dialog
    const mapContainerStyle = {
        width: '100%',
        height: 'calc(100vh - 73px)',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        position: 'relative',
    };
    // Add crosshair cursor to the Leaflet map container only
    useEffect(() => {
        const mapRoot = document.querySelector('.leaflet-container');
        if (mapRoot) {
            if (showSiteDialog) {
                mapRoot.style.cursor = 'crosshair';
            } else {
                mapRoot.style.cursor = '';
            }
        }
        return () => {
            if (mapRoot) mapRoot.style.cursor = '';
        };
    }, [showSiteDialog]);
    return (
        <div
            key={`dashboard-map-${currentPosition ? currentPosition.join('-') : 'default'}`}
            style={mapContainerStyle}
            onClick={() => { if(fabOpen){setFabOpen(false);} if(profileMenuOpen){setProfileMenuOpen(false);} }}
        >
            <MapContainer
                center={currentPosition || [60.1699, 24.9384]}
                zoom={12}
                style={{ width: '100%', height: '100%' }}
            >
                <MapClickHandler showSiteDialog={showSiteDialog} setNewSite={setNewSite} />
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
                <SiteMarkers sites={sites} onEdit={idx => {
                    setEditSiteIdx(idx);
                    setEditSite({ ...sites[idx] });
                }} />
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
            <div style={{ pointerEvents: 'none' }}>
                <div style={{ pointerEvents: 'auto' }}>
                    <NewSiteDialog
                        showSiteDialog={showSiteDialog}
                        setShowSiteDialog={setShowSiteDialog}
                        newSite={newSite}
                        setNewSite={setNewSite}
                        currentPosition={currentPosition}
                        setSites={site => addSite(site)}
                    />
                </div>
                {/* Edit Site Dialog */}
                {editSiteIdx !== null && editSite && (
                    <div style={{
                        pointerEvents: 'auto',
                        position: 'fixed',
                        bottom: 32,
                        right: 32,
                        zIndex: 5000,
                    }}>
                        <div style={{
                            background: '#fff',
                            borderRadius: 14,
                            boxShadow: '0 4px 24px rgba(44,83,100,0.18)',
                            padding: 28,
                            minWidth: 320,
                            maxWidth: 380,
                            position: 'relative',
                        }}>
                            <button onClick={() => { setEditSiteIdx(null); setEditSite(null); }} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', fontSize: 22, color: '#009fe3', cursor: 'pointer', fontWeight: 700, lineHeight: 1 }} aria-label="Close">&times;</button>
                            <h2 style={{ margin: '0 0 18px 0', fontSize: 22, color: '#009fe3', fontWeight: 700 }}>Edit Site</h2>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Name</label>
                                <input
                                    type="text"
                                    value={editSite.name}
                                    onChange={e => setEditSite(s => ({ ...s, name: e.target.value }))}
                                    style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: '95%', fontSize: 16 }}
                                    placeholder="Site name"
                                />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Location</label>
                                <input
                                    type="text"
                                    value={editSite.location ? editSite.location.join(', ') : ''}
                                    readOnly
                                    style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: '95%', fontSize: 16, background: '#f7f7f7' }}
                                />
                            </div>
                            <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
                                <label style={{ fontWeight: 500 }}>
                                    <input type="checkbox" checked={editSite.online} onChange={e => setEditSite(s => ({ ...s, online: e.target.checked }))} /> Online
                                </label>
                                <label style={{ fontWeight: 500 }}>
                                    <input type="checkbox" checked={editSite.inService} onChange={e => setEditSite(s => ({ ...s, inService: e.target.checked }))} /> In Service
                                </label>
                            </div>
                            <button
                                style={{ width: '100%', padding: '10px 0', background: '#009fe3', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}
                                disabled={!editSite.name || !editSite.location}
                                onClick={async () => {
                                    await updateSite(editSiteIdx, editSite);
                                    setEditSiteIdx(null);
                                    setEditSite(null);
                                }}
                            >Save Changes</button>
                        </div>
                    </div>
                )}
            </div>
            {/* Edit Site Dialog */}
            {editSiteIdx !== null && editSite && (
                <div style={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    zIndex: 5000,
                    pointerEvents: 'none',
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: 14,
                        boxShadow: '0 4px 24px rgba(44,83,100,0.18)',
                        padding: 28,
                        minWidth: 320,
                        maxWidth: 380,
                        position: 'relative',
                        pointerEvents: 'auto',
                    }}>
                        <button onClick={() => { setEditSiteIdx(null); setEditSite(null); }} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', fontSize: 22, color: '#009fe3', cursor: 'pointer', fontWeight: 700, lineHeight: 1 }} aria-label="Close">&times;</button>
                        <h2 style={{ margin: '0 0 18px 0', fontSize: 22, color: '#009fe3', fontWeight: 700 }}>Edit Site</h2>
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Name</label>
                            <input
                                type="text"
                                value={editSite.name}
                                onChange={e => setEditSite(s => ({ ...s, name: e.target.value }))}
                                style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: '95%', fontSize: 16 }}
                                placeholder="Site name"
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Location</label>
                            <input
                                type="text"
                                value={editSite.location ? editSite.location.join(', ') : ''}
                                readOnly
                                style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: '95%', fontSize: 16, background: '#f7f7f7' }}
                            />
                        </div>
                        <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
                            <label style={{ fontWeight: 500 }}>
                                <input type="checkbox" checked={editSite.online} onChange={e => setEditSite(s => ({ ...s, online: e.target.checked }))} /> Online
                            </label>
                            <label style={{ fontWeight: 500 }}>
                                <input type="checkbox" checked={editSite.inService} onChange={e => setEditSite(s => ({ ...s, inService: e.target.checked }))} /> In Service
                            </label>
                        </div>
                        <button
                            style={{ width: '100%', padding: '10px 0', background: '#009fe3', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}
                            disabled={!editSite.name || !editSite.location}
                            onClick={() => {
                                setSites(sites => sites.map((s, i) => i === editSiteIdx ? { ...editSite } : s));
                                setEditSiteIdx(null);
                                setEditSite(null);
                            }}
                        >Save Changes</button>
                    </div>
                </div>
            )}
            <ProfileMenu
                profileMenuOpen={profileMenuOpen}
                setProfileMenuOpen={setProfileMenuOpen}
                profile={profile}
                setProfile={setProfile}
                markerColor={markerColor}
            />
        </div>
    );
}

export default MapView;
