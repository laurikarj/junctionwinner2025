const express = require('express');
const router = express.Router();

// In-memory store for demo; replace with DB in production
let sites = [];

// Get all sites
router.get('/', (req, res) => {
    res.json(sites);
});

// Add a new site
router.post('/', (req, res) => {
    const site = req.body;
    sites.push(site);
    res.status(201).json(site);
});

// Update a site by index
router.put('/:idx', (req, res) => {
    const idx = parseInt(req.params.idx, 10);
    if (idx >= 0 && idx < sites.length) {
        sites[idx] = req.body;
        res.json(sites[idx]);
    } else {
        res.status(404).json({ error: 'Site not found' });
    }
});

// Delete a site by index
router.delete('/:idx', (req, res) => {
    const idx = parseInt(req.params.idx, 10);
    if (idx >= 0 && idx < sites.length) {
        const removed = sites.splice(idx, 1);
        res.json(removed[0]);
    } else {
        res.status(404).json({ error: 'Site not found' });
    }
});

module.exports = router;
