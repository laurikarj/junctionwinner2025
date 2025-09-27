const express = require('express');
const router = express.Router();

// In-memory user data
let users = [];
let nextId = 1;

// Search users (by full or partial match)
router.get('/', (req, res) => {
    const { name, email } = req.query;
    let results = users;
    if (name) {
        results = results.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (email) {
        results = results.filter(u => u.email.toLowerCase().includes(email.toLowerCase()));
    }
    res.json(results);
});

// Create new user
router.post('/', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    const user = { id: nextId++, name, email };
    users.push(user);
    res.status(201).json(user);
});

// Get user by id
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// Update user by id
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    res.json(user);
});

// Delete user by id
router.delete('/:id', (req, res) => {
    const idx = users.findIndex(u => u.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'User not found' });
    users.splice(idx, 1);
    res.status(204).end();
});

module.exports = router;
