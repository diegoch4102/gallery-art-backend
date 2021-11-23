/** Captura cualquier error y continúal al siguiente middleware */
function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}

/** Captura el error y termina el proceso y muestra el error al usuario  */
// function errorHandler(err, req, res) {
//     res.status(500).json({
//         message: err.message,
//         stack: err.stack,
//     });
// }

function boomErrorHandler(err, req, res, next) {
    // Cuando se usa boom para manejar un erro, boom agrega al error
    // la propiedad .isBoom
    if (err.isBoom) {
        // boom envía toda la información en el parámetro output
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

// module.exports = { logErrors, errorHandler, boomErrorHandler };
module.exports = { logErrors, boomErrorHandler };
