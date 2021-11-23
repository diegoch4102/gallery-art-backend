const connection = require("../DB/connectionDB");

// TODO: Agregar _id a maker
/* const workSchema = connection.Schema({
    name: String,
    desc: {
        descText: String,
        creationYear: String
    },
    value: String,
    available: String,
    img: {
        data: Buffer,
        contentType: String
    },
    maker: {
        makerName: String,
        user: String
    },
    popularity: {
        likes: String,
        dislikes: String
    }
}, {
    collection: "Works",
    versionKey: false
}); */

const workSchema = connection.Schema({
    name: String,
    desc: String,
    img: {
        data: Buffer,
        contentType: String
    }
}, {
    collection: "Works",
    versionKey: false
});

const workDAO = connection.model('Works', workSchema);

module.exports = workDAO;