import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function SetViewToCurrentLocation({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, map.getZoom(), { animate: true });
        }
    }, [position, map]);
    return null;
}
export default SetViewToCurrentLocation;
