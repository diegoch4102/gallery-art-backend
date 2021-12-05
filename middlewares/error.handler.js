/* Los middleware de tipo error -los que detectan errores- llevan
como primer parámetro al error y, obligatoriamente, los otros tres
parámetros: req, res y next */

// Esto middleware se implementan el el archivo js principal -luego
// del routing-.

/** Captura cualquier error y continúal al siguiente middleware */
/* Este middleware también podría cumplir la función de envíar el
  error a un sistema de tracking de errores -como centry (o ese es el
  nombre que le entendía a Nicolas Molina)- para monitorear los
  errores
*/
function logErrors(err, req, res, next) {
    console.error(err);
    // Aunque se detecta el error 👆🏻, se indica que envíe el error
    // al siguiente paso -puede ser al siguiente middleware-.
    next(err);
}

/** Captura el error y, a diferencia de 👆🏻, responde al cliente
 * mostrando el error y finaliza el proceso */
function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        // El es stack es la ruta hacia el origen del error
        stack: err.stack,
    });
}

/** Uso de boom para el manejo de erros */
function boomErrorHandler(err, req, res, next) {
    /* Cuando se usa boom para manejar un error, boom agrega al error
    la propiedad .isBoom */
    /* Arroja un error tipo boom según el código -en los servicios-
    que condiciona ciertos erroes a ser boom */
    if (err.isBoom) {
        // boom envía toda la información en el parámetro output
        const { output } = err;
        /* El status code es dinámico -depende de cada error (como se
          define en los servicios)- y lo lee del output */
        res.status(output.statusCode).json(output.payload);
    }
    /* Si el error no es de tipo boom -> continúe al siguiente
    middleware de error */
    next(err);
}

// module.exports = { logErrors, errorHandler, boomErrorHandler };
module.exports = { logErrors, boomErrorHandler };
