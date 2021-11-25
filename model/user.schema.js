const connection = require("../DB/connectionDB");
// const Joi = require('joi');

// const id = Joi.string().uuid();
// const firstname = Joi.string().min(2).max(12);
// const lastname = Joi.string().min(2).max(12);
// const email = Joi.string().email();
// const userWord = Joi.string().min(3).max(12);
// const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}'));
// const birhtdate = Joi.date();
// const phoneNumber = Joi.number().integer().min(10).max(10);

// const createUserSchema = Joi.object({
//     firstname: firstname.required(),
//     lastname: lastname.required(),
//     email: email.required(),
//     userWord: userWord.required(),
//     password: password.required(),
//     birhtdate: birhtdate,
//     phoneNumber: phoneNumber,
// });

// const updateUserSchema = Joi.object({
//     firstname: firstname,
//     lastname: lastname,
//     email: email,
//     userWord: userWord,
//     password: password,
//     birhtdate: birhtdate,
//     phoneNumber: phoneNumber,
// });

// const getUserSchema = Joi.object({
//     id: id.required(),
// });

const generalString = {
    type: String,
    minLength: 3,
    maxLength: 12,
};
const justString = { type: String, };
const requiredTrue = { required: true };
// const requiredFalse = { required: false };

const createUsersSchemaDB = connection.Schema({
    firstname: {...generalString, ...requiredTrue },
    lastname: {...generalString, ...requiredTrue },
    email: {...justString, ...requiredTrue },
    username: {...generalString, ...requiredTrue },
    password: {...generalString, ...requiredTrue },
    birthdate: { type: Date, default: Date.now },
    phoneNumber: {...generalString, ...requiredTrue },
}, {
    collection: "Users",
    versionKey: false
});

// const updateUsersSchemaDB = connection.Schema({
//     firstname: {...generalString, ...requiredFalse },
//     lastname: {...generalString, ...requiredFalse },
//     email: {...justString, ...requiredFalse },
//     username: {...generalString, ...requiredFalse },
//     password: {...generalString, ...requiredFalse },
//     birthdate: {...generalString, ...requiredFalse },
//     phoneNumber: {...generalString, ...requiredFalse },
// }, {
//     collection: "User",
//     versionKey: false
// });

const userSchema = connection.model('Users', createUsersSchemaDB);
// const updateUserSchemaDB = connection.model('User', updateUsersSchemaDB);

module.exports = { userSchema };
