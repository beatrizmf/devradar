const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => res.json({ status: 'ok' }));

module.exports = routes;
