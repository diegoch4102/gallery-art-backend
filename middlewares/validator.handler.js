const boom = require('@hapi/boom');

/* Es necesario que sea dinámico: reciba el schema y la propiedad a
validar */
// Cloujure: un función que retorna otra función
function validatorHandler(schema, property) {
    return (req, res, next) => {
        /* La información de un req puede viajar en el body, en params
        o en query */
        const data = req[property];
        /* La validación retorna "error" como una propiedad */
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(boom.badRequest(error));
        }
        next();
    };
}

module.exports = validatorHandler;
