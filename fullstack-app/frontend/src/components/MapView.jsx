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
                <SiteMarkers sites={sites} />
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
            <NewSiteDialog
                showSiteDialog={showSiteDialog}
                setShowSiteDialog={setShowSiteDialog}
                newSite={newSite}
                setNewSite={setNewSite}
                currentPosition={currentPosition}
                setSites={setSites}
            />
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
