const boom = require('@hapi/boom');
const { workSchema } = require('./../model/work.schema');

class UsersService {
    async create(data) {
        return await workSchema.create(data);
    }

    async find(filterUser) {
        return new Promise((resolve, reject) => {
            let filter = {};
            if (filterUser !== null) {
                filter = { maker: { _id: filterUser } };
            }
            workSchema.find(filter)
                .populate('maker')
                .exec((error, populated) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(populated);
                });
        });
    }

    async findOne(id) {
        let user = await workSchema.findById(id);
        if (!user) {
            throw boom.notFound(`User ${id} no found`);
        }
        return user;
    }

    async update(id, changes) {
        const query = { _id: id };
        return await workSchema.findOneAndUpdate(query, changes);

    }

    async delete(id) {
        return await workSchema.deleteOne({ _id: id });
    }
}

module.exports = UsersService;
