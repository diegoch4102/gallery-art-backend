const faker = require('faker');

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
            });
        }
    }

    create(data) {
        const newUser = {
            id: faker.datatype.uuid(),
            ...data
        };
        this.users.push(newUser);
        return newUser;
    }

    find() {
        return this.users;
    }

    findOne(id) {
        return this.users.find(item => item.id === id);
    }

    update(id, changes) {
        const index = this.users.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error(`User with id: ${id} no found`);
        }
        const user = this.users[index];
        this.users[index] = {
            ...user,
            ...changes,
        };
        return this.products[index];
    }

    delete(id) {
        const index = this.users.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error(`User: ${id} no found`);
        }
        this.users.splice(index, 1);
        return { message: `User: ${id} deleted` };
    }
}

module.exports = UsersService;
