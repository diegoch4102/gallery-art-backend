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
        if (key === 'username' || key === 'email') {
            continue;
        }
        // console.group(`[${key}: ${value}]`);
        let hash = await bcrypt.hash(value, 10);
        data[key] = hash;
        // console.log(`${key} hashed`);
        // let confirm = await bcrypt.compare(value, hash);
        // console.log(`Confirmaticon: ${confirm}`);
        // console.groupEnd();
    }
    // console.log(`En of user hashing`);
    return data;
};

usersCtrl.addNew = async(user) => {
    const encryptedUser = await usersCtrl.crypt(user);
    // console.group('[encryptedUser]');
    // console.log(encryptedUser);
    // console.groupEnd();
    const responseUser = await service.create(encryptedUser);
    // console.group('[Returned from service]');
    // console.log(responseUser);
    // console.groupEnd();
    return ({ 'email': responseUser.email, 'username': responseUser.username });
};

usersCtrl.update = async(id, user) => {
    return await service.update(id, user);
};

usersCtrl.delete = async(id) => {
    await service.delete({ _id: id });
};

module.exports = usersCtrl;
