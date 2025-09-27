import React, { useRef, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function SiteMarkers({ sites, onEdit, onDelete, onShowRoute, routeTo, setRouteTo, selectedSiteId, setSelectedSiteId, selectedSiteIdx, setSelectedSiteIdx }) {
    const markerRefs = useRef({});

    useEffect(() => {
        if (selectedSiteId != null || selectedSiteIdx != null) {
            let ref = null;
            if (selectedSiteId != null && markerRefs.current[selectedSiteId]) {
                ref = markerRefs.current[selectedSiteId];
            } else if (selectedSiteIdx != null && markerRefs.current[`idx-${selectedSiteIdx}`]) {
                ref = markerRefs.current[`idx-${selectedSiteIdx}`];
            }
            if (ref && ref.openPopup) {
                ref.openPopup();
            } else if (ref && ref.current && ref.current.openPopup) {
                ref.current.openPopup();
            }
        }
    }, [selectedSiteId, selectedSiteIdx]);

    return (
        <>
            {sites.map((site, idx) => {
                const markerKey = site.id || `site-${idx}`;
                return (
                    <Marker
                        key={markerKey}
                        position={site.location}
                        icon={new L.DivIcon({
                            html: `<i class='fa-solid fa-building' style='color:${site.online ? '#009fe3' : '#aaa'};font-size:1.7rem;text-shadow:0 0 8px #fff, 0 0 12px #fff;'></i>` + (site.inService ? `<span style='position:absolute;top:-8px;right:-8px;font-size:1.1rem;color:#fbc02d;' title='In Service'><i class='fa-solid fa-wrench'></i></span>` : ''),
                            iconSize: [32, 32],
                            className: 'fa-marker-icon',
                            iconAnchor: [16, 32],
                            popupAnchor: [0, -32]
                        })}
                        ref={ref => {
                            if (site.id) markerRefs.current[site.id] = ref;
                            markerRefs.current[`idx-${idx}`] = ref;
                        }}
                    >
                        <Popup eventHandlers={{ close: () => { setSelectedSiteId(null); setSelectedSiteIdx(null); } }}>
                            <div>
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
                                <button
                                    style={{marginTop:8,background:'#fbc02d',color:'#fff',border:'none',borderRadius:5,padding:'4px 12px',cursor:'pointer', marginBottom: 6, marginRight: 8}}
                                    onClick={() => {
                                        if (routeTo && routeTo.location && site.location && routeTo.location[0] === site.location[0] && routeTo.location[1] === site.location[1]) {
                                            setRouteTo(null);
                                        } else {
                                            onShowRoute(site);
                                        }
                                    }}
                                >
                                    {(routeTo && routeTo.location && site.location && routeTo.location[0] === site.location[0] && routeTo.location[1] === site.location[1]) ? 'Hide route' : 'Show route'}
                                </button>
                                <button style={{marginTop:2,background:'#009fe3',color:'#fff',border:'none',borderRadius:5,padding:'4px 12px',cursor:'pointer'}} onClick={() => onEdit(idx)}>Edit</button>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </>
    );
}
