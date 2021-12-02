const UsersService = require('./../services/user.services');
const bcrypt = require('bcrypt');

const service = new UsersService();

const usersCtrl = {};

usersCtrl.getAll = async() => {
    return await service.find();
};

usersCtrl.getOne = async(id) => {
    return await service.findOne(id);
};

usersCtrl.encrypt = async(val) => {
    let res = await bcrypt.hash(val, 10);
    return res;
};

usersCtrl.crypt = async(data) => {
    for (let [key, value] of Object.entries(data)) {
        if (key === 'username') {
            continue;
        }
        // console.group(`[${key}: ${value}]`);
        let hash = await bcrypt.hash(value, 10);
        // let confirm = await bcrypt.compare(value, hash);
        // console.log(`Confirmaticon: ${confirm}`);
        data[key] = hash;
        // console.groupEnd();
    }
};

usersCtrl.addNew = async(user) => {
    usersCtrl.crypt(user);
    // return await service.create(user);
};

usersCtrl.update = async(id, user) => {
    return await service.update(id, user);
};

usersCtrl.delete = async(id) => {
    await service.delete({ _id: id });
};

module.exports = usersCtrl;
