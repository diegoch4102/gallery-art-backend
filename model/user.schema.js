const connection = require("../DB/connectionDB");
const Joi = require('joi');

const id = Joi.string().uuid();
const firstname = Joi.string().min(2).max(12);
const lastname = Joi.string().min(2).max(12);
const email = Joi.string().email();
const userWord = Joi.string().min(3).max(12);
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}'));
const birhtdate = Joi.date();
const phoneNumber = Joi.number().integer().min(10).max(10);

const createUserSchema = Joi.object({
    firstname: firstname.required(),
    lastname: lastname.required(),
    email: email.required(),
    userWord: userWord.required(),
    password: password.required(),
    birhtdate: birhtdate,
    phoneNumber: phoneNumber,
});

const updateUserSchema = Joi.object({
    firstname: firstname,
    lastname: lastname,
    email: email,
    userWord: userWord,
    password: password,
    birhtdate: birhtdate,
    phoneNumber: phoneNumber,
});

const getUserSchema = Joi.object({
    id: id.required(),
});

const usersSchemaDB = connection.Schema({
    user: String,
    name: String,
    lastname: String,
    email: String,
    phoneNumber: String,
    password: String
}, {
    collection: "User",
    versionKey: false
});

const userSchemaDB = connection.model('Users', usersSchemaDB);

module.exports = { userSchemaDB, createUserSchema, updateUserSchema, getUserSchema };
