const mongoose = require("mongoose");

const uri = "mongodb+srv://db-admin:k9hCDR3v4Aa8iiR@cluster-diego-misiontic." +
    "klqr4.mongodb.net/ArtGallery?retryWrites=true&w=majority";

mongoose.connect(uri).then(() => {
    console.log("Conectado a MongoDB");
}).catch((e) => console.log("Fallo en la conexión a base de datos." + e));

module.exports = mongoose;