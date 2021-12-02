const boom = require('@hapi/boom');
const { userSchema } = require('./../model/user.schema');

class UsersService {
    async create(data) {
        userSchema.create(data);
    }

    async find() {
        return await userSchema.find();
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
