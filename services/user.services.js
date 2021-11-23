const faker = require('faker');
const boom = require('@hapi/boom');
const { newUserSchemaDB } = require('./../model/user.schema');

class UsersService {
    constructor() {
        this.users = [];
        this.generate();
    }
    generate() {
        for (let index = 0; index < 10; index++) {
            this.users.push({
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean(),
            });
        }
    }

    async create(data) {
        return await newUserSchemaDB.create(data);
    }

    async find() {
        let users = await newUserSchemaDB.find();
        return users;
    }

    async findOne(id) {
        let user = await newUserSchemaDB.findById(id);
        if (!user) {
            throw boom.notFound(`User ${id} no found`);
        }
        return user;
    }

    async update(id, changes) {
        const query = { _id: id };
        return await newUserSchemaDB.findOneAndUpdate(query, changes);

    }

    async delete(id) {
        const index = this.users.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound(`User ${id} no found`);
        }
        this.users.splice(index, 1);
        return { message: `User: ${id} deleted` };
    }
}

module.exports = UsersService;
