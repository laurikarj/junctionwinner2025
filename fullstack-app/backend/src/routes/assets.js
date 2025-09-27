const express = require('express');
const router = express.Router();

// In-memory asset data
let assets = [];
let nextId = 1;

// Search assets (by full or partial match)
router.get('/', (req, res) => {
    const { name, assetId } = req.query;
    let results = assets;
    if (name) {
        results = results.filter(a => a.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (assetId) {
        results = results.filter(a => a.assetId.toLowerCase().includes(assetId.toLowerCase()));
    }
    res.json(results);
});

// Create new asset
router.post('/', (req, res) => {
    const { name, assetId, description } = req.body;
    if (!name || !assetId) {
        return res.status(400).json({ error: 'Name and assetId are required' });
    }
    const asset = { id: nextId++, name, assetId, description: description || '' };
    assets.push(asset);
    res.status(201).json(asset);
});

// Get asset by id
router.get('/:id', (req, res) => {
    const asset = assets.find(a => a.id === parseInt(req.params.id));
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.json(asset);
});

// Update asset by id
router.put('/:id', (req, res) => {
    const asset = assets.find(a => a.id === parseInt(req.params.id));
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    const { name, assetId, description } = req.body;
    if (name) asset.name = name;
    if (assetId) asset.assetId = assetId;
    if (description !== undefined) asset.description = description;
    res.json(asset);
});

// Delete asset by id
router.delete('/:id', (req, res) => {
    const idx = assets.findIndex(a => a.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Asset not found' });
    assets.splice(idx, 1);
    res.status(204).end();
});

module.exports = router;
