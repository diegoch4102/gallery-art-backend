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
        creationYear: String
    },
    value: Number,
    available: Boolean,
    category: String,
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
const creationYearJ = Joi.string().pattern(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/);
const valueJ = Joi.number().positive();
const valueUpdateJ = Joi.string();
const availableJ = Joi.boolean();
const availableUpdateJ = Joi.string();
const categoryJ = Joi.string();
const idJ = Joi.string().alphanum().min(24);
const dataImgJ = Joi.string();
const contentTypeJ = Joi.string();
const likesJ = Joi.array().items(Joi.string().alphanum().min(24)).sparse();

const createWork = Joi.object({
    name: nameJ.required(),
    descText: descTextJ.required(),
    creationYear: creationYearJ.required(),
    value: valueUpdateJ.required(),
    available: availableUpdateJ.required(),
    category: categoryJ.required(),
    maker: idJ.required()
});

const updateWork = Joi.object({
    desc: Joi.object({
        descText: descTextJ,
        creationYear: creationYearJ
    }),
    img: Joi.object({
        data: dataImgJ,
        contentType: contentTypeJ,
    }),
    plrty: Joi.object({
        likes: likesJ,
        dislikes: likesJ
    }),
    _id: idJ,
    name: nameJ,
    value: valueJ,
    available: availableJ,
    category: categoryJ,
    maker: Joi.object({
        _id: idJ,
        firstname: nameJ,
        username: nameJ
    })
});

const getWork = Joi.object({
    id: idJ.required()
});

module.exports = { workSchema, createWork, updateWork, getWork };
