const connection = require("../DB/connectionDB");

const worksSchema = connection.Schema({
    name: String,
    desc: {
        descText: String,
        creationYear: Date
    },
    value: String,
    available: Boolean,
    img: {
        data: Buffer,
        contentType: String
    },
    maker: {
        type: connection.Schema.Types.ObjectId,
        ref: 'Users',
    },
    plrty: {
        likes: [{
            type: connection.Schema.Types.ObjectId,
            ref: 'Users',
        }],
        dislikes: [{
            type: connection.Schema.Types.ObjectId,
            ref: 'Users',
        }],
    }
}, {
    collection: "Works",
    versionKey: false
});

// const worksSchema = connection.Schema({
//     name: String,
//     desc: {
//         descText: String,
//         creationYear: String
//     },
//     value: String,
//     available: String,
//     img: {
//         data: Buffer,
//         contentType: String
//     },
//     maker: {
//         type: connection.Schema.Types.ObjectId,
//         ref: 'Users',
//     },
// }, {
//     collection: "Works",
//     versionKey: false
// });

const workSchema = connection.model('Works', worksSchema);

module.exports = workSchema;
