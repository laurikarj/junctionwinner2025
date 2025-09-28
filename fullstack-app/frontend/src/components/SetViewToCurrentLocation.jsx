import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function SetViewToCurrentLocation({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, map.getZoom(), { animate: true, duration: 1.0 });
        }
    }, [position, map]);
    return null;
}
export default SetViewToCurrentLocation;
