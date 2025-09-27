import { useMapEvent } from 'react-leaflet';

export default function MapClickHandler({ showSiteDialog, setNewSite }) {
    useMapEvent('click', (e) => {
        if (showSiteDialog) {
            setNewSite(s => ({ ...s, location: [e.latlng.lat, e.latlng.lng] }));
        }
    });
    return null;
}
