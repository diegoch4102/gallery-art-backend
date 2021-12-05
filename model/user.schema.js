const connection = require("../DB/connectionDB");
const Joi = require('joi');

const generalString = {
    type: String,
};

const requiredTrue = { required: true };

const createUsersSchemaDB = connection.Schema({
    firstname: {...generalString, ...requiredTrue },
    lastname: {...generalString, ...requiredTrue },
    email: {...generalString, ...requiredTrue },
    username: {...generalString, ...requiredTrue },
    password: {...generalString, ...requiredTrue },
    birthdate: {...generalString, ...requiredTrue },
    phoneNumber: {...generalString, ...requiredTrue },
}, {
    collection: "Users",
    versionKey: false
});


const userSchema = connection.model('Users', createUsersSchemaDB);

const firstnameJ = Joi.string().max(12).min(2).trim();
const lastnameJ = Joi.string().max(16).min(2).trim();
const emailJ = Joi.string().email();
const usernameJ = Joi.string().min(3).max(12).trim();
const passwordJ = Joi.string().pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/);
const birthdateJ = Joi.string().pattern(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/);
const phoneNumberJ = Joi.string().length(10).pattern(/^\d{3,3}[\-\. ]?\d{3,3}[\-\. ]?\d{4,4}$/);
const idJ = Joi.string().alphanum().min(24);

const createUser = Joi.object({
    firstname: firstnameJ.required(),
    lastname: lastnameJ.required(),
    email: emailJ.required(),
    username: usernameJ.required(),
    password: passwordJ.required(),
    birthdate: birthdateJ.required(),
    phoneNumber: phoneNumberJ.required(),
});

const updateUser = Joi.object({
    firstname: firstnameJ,
    lastname: lastnameJ,
    email: emailJ,
    username: usernameJ,
    password: passwordJ,
    birthdate: birthdateJ,
    phoneNumber: phoneNumberJ,
});

const getUser = Joi.object({
    id: idJ.required()
});

module.exports = { userSchema, createUser, updateUser, getUser };
