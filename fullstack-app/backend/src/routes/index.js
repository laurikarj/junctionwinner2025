function setRoutes(app) {
    app.get('/api', (req, res) => {
        res.send('API is working');
    });

    // Add more routes here as needed
}

module.exports = setRoutes;