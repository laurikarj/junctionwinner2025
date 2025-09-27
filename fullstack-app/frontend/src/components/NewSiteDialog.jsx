import React from 'react';

export default function NewSiteDialog({
    showSiteDialog,
    setShowSiteDialog,
    newSite,
    setNewSite,
    currentPosition,
    setSites
}) {
    if (!showSiteDialog) return null;
    return (
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
                    onClick={async () => {
                        await setSites({ ...newSite });
                        setShowSiteDialog(false);
                    }}
                >Add Site</button>
            </div>
        </div>
    );
}
