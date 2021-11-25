const boom = require('@hapi/boom');
const { userSchema } = require('./../model/user.schema');

class UsersService {
    async create(data) {
        return await userSchema.create(data);
    }

    async find() {
        let users = await userSchema.find();
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
        return await userSchema.findOneAndUpdate(query, changes);

    }

    async delete(id) {
        return await userSchema.deleteOne({ _id: id });
    }
}

module.exports = UsersService;
