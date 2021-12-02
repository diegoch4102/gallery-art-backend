const UsersService = require('./../services/user.services');

const service = new UsersService();

const usersCtrl = {};

usersCtrl.getAll = async() => {
    return await service.find();
};

usersCtrl.getOne = async(id) => {
    return await service.findOne(id);
};

usersCtrl.crypt = async() => {
    for (let [key, value] of Object.entries(data)) {
        console.group(`[]`);
        console.log(`${key}=${value}`);
        console.groupEnd();
    }
};

usersCtrl.addNew = async(user) => {
    usersCtrl.crypt();
    // return await service.create(user);
};

usersCtrl.update = async(id, user) => {
    return await service.update(id, user);
};

usersCtrl.delete = async(id) => {
    await service.delete({ _id: id });
};

module.exports = usersCtrl;