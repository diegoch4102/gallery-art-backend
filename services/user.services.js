const boom = require('@hapi/boom');
const { userSchema } = require('./../model/user.schema');

class UsersService {
    async create(data) {
        return await userSchema.create(data);
    }

    async find() {
        const users = await userSchema.find();
        if (!users) {
            throw boom.notFound(`User ${id} no found`);
        }
        return users;
    }

    async findOne(id) {
        let user = await userSchema.findById(id);
        if (!user) {
            throw boom.notFound(`User ${id} no found`);
        }
        return user;
    }

    async update(id, changes) {
        const query = { _id: id };
        const user = await userSchema.findOneAndUpdate(query, changes);
        if (!user) {
            throw boom.notFound(`User ${id} no found`);
        }
        return user;
    }

    async delete(id) {
        const confirm = await userSchema.deleteOne({ _id: id });
        if (!confirm) {
            throw boom.notFound(`User ${id} no found`);
        }
        return confirm;
    }
}

module.exports = UsersService;
