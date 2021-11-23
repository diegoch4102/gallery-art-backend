const express = require('express');
const routerApi = require('./routes');
const cors = require("cors");


const app = express();
const port = process.env.PORT || 1600;
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("<h1>Hola app</h1>");
});

routerApi(app);

app.listen(port, () => {
    console.log("app Conectado al servidor");
});
