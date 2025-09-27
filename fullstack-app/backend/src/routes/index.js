
const sitesRouter = require('./sites');
const usersRouter = require('./users');
const assetsRouter = require('./assets');

function setRoutes(app) {
    app.get('/api', (req, res) => {
        res.send('API is working');
    });

    app.use('/api/sites', sitesRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/assets', assetsRouter);
}

module.exports = setRoutes;