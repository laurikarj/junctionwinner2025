import React, { useRef } from 'react';

export default function AssetDialog({ open, onClose, onSave }) {
    const [name, setName] = React.useState('');
    const [assetId, setAssetId] = React.useState('');
    const [image, setImage] = React.useState(null);
    const fileInput = useRef();

    if (!open) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: 32,
            right: 420,
            zIndex: 6000,
            pointerEvents: 'auto',
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
                <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', fontSize: 22, color: '#009fe3', cursor: 'pointer', fontWeight: 700, lineHeight: 1 }} aria-label="Close">&times;</button>
                <h2 style={{ margin: '0 0 18px 0', fontSize: 22, color: '#009fe3', fontWeight: 700 }}>Add Asset</h2>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Asset Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: '95%', fontSize: 16 }}
                        placeholder="Asset name"
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Asset ID</label>
                    <input
                        type="text"
                        value={assetId}
                        onChange={e => setAssetId(e.target.value)}
                        style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: '95%', fontSize: 16 }}
                        placeholder="Asset ID"
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInput}
                        onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = ev => setImage(ev.target.result);
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                    {image && <img src={image} alt="Asset" style={{ marginTop: 8, maxWidth: 120, maxHeight: 80, borderRadius: 6 }} />}
                </div>
                <button
                    style={{ width: '100%', padding: '10px 0', background: '#009fe3', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}
                    disabled={!name || !assetId || !image}
                    onClick={() => {
                        onSave({ name, id: assetId, image });
                        setName('');
                        setAssetId('');
                        setImage(null);
                        fileInput.current.value = '';
                    }}
                >Add Asset</button>
            </div>
        </div>
    );
}
