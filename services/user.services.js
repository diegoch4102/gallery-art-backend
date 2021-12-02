const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { userSchema } = require('./../model/user.schema');

class UsersService {
    async create(data) {
        // for (let value in data.entries()) {
        //     if (value === 'username') {
        //         continue;
        //     }
        //     console.group(`[${value}]`);
        //     // console.log(`data before: ${data.value}`);
        //     bcrypt.hash(data.value, 10)
        //         .then(hash => {
        //             console.log(`hash: ${hash}`);
        //             bcrypt.conmpare(value, hash);
        //             data = {
        //                 ...data,
        //                 value: hash
        //             };
        //         })
        //         .then(confirm => {
        //             console.log(`confirm: ${confirm}`);
        //             // console.log(`data after: ${data.value}`);
        //         });
        //     console.groupEnd();
        // }
        console.group(`[bcrypt]`);
        bcrypt.hash(data.password, 10)
            .then((hash) => {
                bcrypt.compare(data.password, hash);
                data = {
                    ...data,
                    password: hash
                };
                console.log(`data:`);
                console.log(data);
            })
            .then((confirm) => {
                console.log(`confirm: ${confirm}`);
            });
        // .then(() => {
        //   bcrypt.hash(data.lastname, 10);
        //   bcrypt.hash(data.email, 10);
        // })
        // .then(() => {
        //   userSchema.create(data);
        // })
        // .then(response => {
        //   return response;
        // });
        console.groupEnd();
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