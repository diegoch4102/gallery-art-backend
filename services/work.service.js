// const boom = require('@hapi/boom');
const workSchema = require('./../model/work.schema');

class WorksService {
    async create(data) {
        // return await workSchema.create(data);
        let workReturned = await workSchema.create(data);

        return new Promise((resolve, reject) => {
            workSchema.findById(workReturned._id)
                .populate('maker', 'firstname username')
                .populate({
                    path: 'plrty',
                    populate: [
                        { path: 'likes', select: 'firstname username' },
                        { path: 'dislikes', select: 'firstname username' }
                    ]
                })
                .exec((error, populated) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(populated);
                });
        });
    }

    async find() {
        return new Promise((resolve, reject) => {
            workSchema.find()
                .populate('maker', 'firstname username')
                .populate({
                    path: 'plrty',
                    populate: [
                        { path: 'likes', select: 'firstname username' },
                        { path: 'dislikes', select: 'firstname username' }
                    ]
                })
                .exec((error, populated) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(populated);
                });

        });
    }

    async findOne(id) {
        // let user = await workSchema.findById(id);
        // if (!user) {
        //     throw boom.notFound(`User ${id} no found`);
        // }
        // return user;
        return new Promise((resolve, reject) => {
            workSchema.findById(id)
                .populate('maker', 'firstname username')
                .populate({
                    path: 'plrty',
                    populate: [
                        { path: 'likes', select: 'firstname username' },
                        { path: 'dislikes', select: 'firstname username' }
                    ]
                })
                .exec((error, populated) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(populated);
                });

        });
    }

    async update(id, changes) {
        const query = { _id: id };
        return await workSchema.findOneAndUpdate(query, changes);

    }

    async delete(id) {
        return await workSchema.deleteOne({ _id: id });
    }
}

module.exports = WorksService;
