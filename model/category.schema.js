const connection = require("../DB/connectionDB");

const categoriesSchema = connection.Schema({
    _id: connection.Schema.Types.ObjectId,
    name: String,
    index: Number
}, {
    collection: "Categories",
    versionKey: false
});

const categorySchema = connection.model('Categories', categoriesSchema);

module.exports = categorySchema;
