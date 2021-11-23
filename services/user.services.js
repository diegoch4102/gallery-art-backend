const faker = require('faker');
const boom = require('@hapi/boom');

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
        const newUser = {
            id: faker.datatype.uuid(),
            ...data
        };
        this.users.push(newUser);
        return newUser;
    }

    async find() {
        return this.users;
    }

    async findOne(id) {
        const user = this.users.find(item => item.id === id);
        if (!user) {
            throw boom.notFound(`User ${id} no found`);
        }
        if (user.isBlock) {
            throw boom.conflict(`User ${id} is blocked`);
        }
        return user;
    }

    async update(id, changes) {
        const index = this.users.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound(`User ${id} no found`);
        }
        const user = this.users[index];
        this.users[index] = {
            ...user,
            ...changes,
        };
        return this.products[index];
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
