const connection = require("../DB/connectionDB");
// const Joi = require('joi');

// const firstname = Joi.string().min(2).max(12);
// const lastname = Joi.string().min(2).max(12);
// const email = Joi.string().email();
// const userWord = Joi.string().min(3).max(12);
// const birhtdate = Joi.date();
// const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}'));


const usersSchema = connection.Schema({
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

const userDAO = connection.model('Users', usersSchema);

module.exports = userDAO;
