const express = require('express');
const routerApi = require('./routes');
const cors = require("cors");
// const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const { logErrors, boomErrorHandler } = require('./middlewares/error.handler');
const { config } = require('./config/config');
const path = require('path');
const { checkApiKey } = require('./middlewares/auth.handler');



const app = express();
const PORT = config.port;
app.use('/public/images', express.static(path.join('public/images')));
app.use(express.json());
app.use(cors());


app.get('/', checkApiKey, (req, res) => {
    res.send("<h1>Hola app</h1>");
});

routerApi(app);

/* Implementación de los middleware de tipo error */
// Estos se implementan luego del uso/asignación del las otras rutas 👆🏻
// Se ejecutan en el orden en que son declarados aquí -es decir que si
// se declara primero uno que termina el proceso, los otros no
// correrán.
app.use(logErrors);
app.use(boomErrorHandler);
// app.use(errorHandler);

app.listen(PORT, () => {
    console.log("app Conectado al servidor");
});
