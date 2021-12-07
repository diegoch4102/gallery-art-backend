const boom = require('@hapi/boom');
const workSchema = require('./../model/work.schema');
const categorySchema = require('./../model/category.schema');

class WorksService {
    async create(data) {
        // return await workSchema.create(data);
        let workReturned = await workSchema.create(data);

        return new Promise((resolve, reject) => {
            workSchema.findById(workReturned._id)
                .populate('maker', 'firstname username')
                // .populate('category', 'name index -_id')
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
                // .populate('category', 'name index -_id')
                .populate({
                    path: 'plrty',
                    populate: [
                        { path: 'likes', select: 'firstname username' },
                        { path: 'dislikes', select: 'firstname username' }
                    ]
                })
                .exec((error, populated) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(populated);
                });

        });
    }

    async getCategories() {
        return await categorySchema.find();
    }

    async getCategory(idCategory) {
        const cat = await categorySchema.findById(idCategory);
        if (!cat) {
            throw boom.notFound(`User ${id} no found`);
        }
        return cat;
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
                // .populate('category', 'name index -_id')
                .populate({
                    path: 'plrty',
                    populate: [
                        { path: 'likes', select: 'firstname username' },
                        { path: 'dislikes', select: 'firstname username' }
                    ]
                })
                .exec((error, populated) => {
                    if (error) {
                        reject(error);
                    } else if (!populated) {
                        reject(boom.notFound(`User ${id} no found`));
                    }
                    resolve(populated);
                });

        });
    }

    async update(id, changes) {
        const query = { _id: id };
        const user = await workSchema.findOneAndUpdate(query, changes);
        if (!user) {
            throw boom.notFound(`User ${id} no found`);
        }
        return user;
        // .then((data) => {
        //     return new Promise((resolve) => {
        //         resolve(this.findOne(id));
        //     });
        // });

    }

    async delete(id) {
        const confirm = await workSchema.deleteOne({ _id: id });
        if (!confirm) {
            throw boom.notFound(`User ${id} no found`);
        }
        return confirm;
        // .then(() => {
        //     return true;
        // })
        // .catch(error => {
        //     console.log({ message: error });
        //     return false;
        // });
    }
}

module.exports = WorksService;
