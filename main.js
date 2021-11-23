const express = require('express');
const routerApi = require('./routes');
const cors = require("cors");
// const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const { logErrors, boomErrorHandler } = require('./middlewares/error.handler');
const { config } = require('./config/config');



const app = express();
const PORT = config.port;
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("<h1>Hola app</h1>");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
// app.use(errorHandler);

app.listen(PORT, () => {
    console.log("app Conectado al servidor");
});
