
const sitesRouter = require('./sites');

function setRoutes(app) {
    app.get('/api', (req, res) => {
        res.send('API is working');
    });

    app.use('/api/sites', sitesRouter);
}

module.exports = setRoutes;