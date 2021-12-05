const connection = require("../DB/connectionDB");
const Joi = require('joi');

const likesArray = {
    type: connection.Schema.Types.ObjectId,
    ref: 'Users',
};

const worksSchema = connection.Schema({
    name: String,
    desc: {
        descText: String,
        creationYear: Date
    },
    value: Number,
    available: Boolean,
    category: {
        type: connection.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    img: {
        data: String,
        contentType: String
    },
    maker: {
        type: connection.Schema.Types.ObjectId,
        ref: 'Users',
    },
    plrty: {
        likes: [likesArray],
        dislikes: [likesArray],
    }
}, {
    collection: "Works",
    versionKey: false
});

const workSchema = connection.model('Works', worksSchema);

const nameJ = Joi.string().min(2).trim();
const descTextJ = Joi.string().max(240);
const creationYearJ = Joi.date();
const valueJ = Joi.number().positive();
const availableJ = Joi.boolean();

module.exports = workSchema;
