const connection = require("../DB/connectionDB");

const likesArray = {
    type: connection.Schema.Types.ObjectId,
    ref: 'Users',
};

const worksSchema = connection.Schema({
    name: String,
    desc: {
        descText: String,
        creationYear: Date
    },
    value: Number,
    available: Boolean,
    category: String,
    img: {
        data: String,
        contentType: String
    },
    maker: {
        type: connection.Schema.Types.ObjectId,
        ref: 'Users',
    },
    plrty: {
        likes: [likesArray],
        dislikes: [likesArray],
    }
}, {
    collection: "Works",
    versionKey: false
});

const workSchema = connection.model('Works', worksSchema);

module.exports = workSchema;
