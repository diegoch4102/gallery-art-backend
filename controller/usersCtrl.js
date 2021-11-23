const userDAO = require("../model/userDAO");

const usersCtrl = {};

usersCtrl.getAll = async() => {
    let users = userDAO.find();
};

usersCtrl.putNew = async(user) => {
    return await userDAO.create(user);
};

usersCtrl.update = async(user) => {
    let idUser = user._id;
    delete user._id;
    return await userDAO.findByIdAndUpdate(idUser, user);
};

usersCtrl.delete = async(id) => {
    await userDAO.deleteOne({ _id: id });
};

module.exports = usersCtrl;