import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function SiteMarkers({ sites }) {
    return (
        <>
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
        </>
    );
}
