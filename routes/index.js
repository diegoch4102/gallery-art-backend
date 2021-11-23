const express = require('express');
const usersRouter = require('./users.router');
const worksRouter = require('./works.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/users', usersRouter);
    router.use('/works', worksRouter);
}

module.exports = routerApi;
