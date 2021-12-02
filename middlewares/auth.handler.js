const boom = require('@hapi/boom');
const { config } = require('./../config/config');

function checkApiKey(req, res, next) {
    // El header api es propio -es decir yo soy quien dice que debe
    // recibir un header llamado así, no es un nombre por defecto
    const apiKey = req.headers.api;
    if (apiKey === config.apiKey) {
        next();
    } else {
        next(boom.unauthorized());
    }
}

module.exports = { checkApiKey };