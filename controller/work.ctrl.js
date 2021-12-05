const WorksService = require("./../services/work.service");
// const fs = require('fs');
// const path = require('path')

const service = new WorksService();

const categories = new Map([
    [1, '61a3fd8f99cb288a9a873443'], // Digital
    [2, '61a3fd7699cb288a9a873441'], // Graphite
    [3, '61a3fdd199cb288a9a873444'], // Ink
    [4, '61a3fde999cb288a9a873445'], // Oil paint
    [5, '61a3fe2a99cb288a9a873447'], // Pen
    [6, '61a3fe1399cb288a9a873446'], // Photograph
    [7, '61a3fe5499cb288a9a873448'], // Textile
]);

const workCtrl = {};

let modImgData = '';
let modImgMimeType = '';

workCtrl.getAll = async() => {
    return await service.find();
};

workCtrl.getCategories = async() => {
    return await service.getCategories();
};

workCtrl.getOneCategory = async(idCategory) => {
    return await service.getCategory(idCategory);
};

workCtrl.getOne = async(id) => {
    return await service.findOne(id);
};

workCtrl.addNew = async(body, file) => {
    let avail = true;
    if (body.available !== 'true') { avail = !true; }
    let imgData = `http://localhost:1600/public/images/${file.originalname}`;
    // let imgData = await fs.readFile(path.join(`${__dirname}/uploads/${file.filename}`));
    let cat = categories.get(Number(body.category));

    let newWork = {
        name: body.name,
        desc: {
            descText: body.descText,
            creationYear: new Date(body.creationYear),
        },
        value: Number(body.value),
        available: avail,
        category: cat,
        img: {
            data: imgData,
            contentType: file.mimetype
        },
        maker: body.maker,
        plrty: {
            likes: [],
            dislikes: []
        }
    };

    // console.group('[obj send]');
    // console.log(newWork);
    // console.groupEnd();

    return await service.create(newWork);
};

workCtrl.modifyImg = async(file) => {
    modImgData = `http://localhost:1600/public/images/${file.originalname}`;
    modImgMimeType = file.mimetype;
};

workCtrl.updateOne = async(id, body) => {
    // console.group('[obj send]');
    // console.log(work);
    // console.groupEnd();
    // return await service.update(id, work);
    let avail = true;
    if (body.available !== 'true') { avail = !true; }
    let imgData = '';
    if (modImgData !== '') {
        imgData = modImgData;
    } else {
        imgData = body.img.data;
    }
    let imgMimeType = '';
    if (modImgMimeType !== '') {
        imgMimeType = modImgData;
    } else {
        imgMimeType = body.img.contentType;
    }
    let cat = categories.get(Number(body.category));

    let modWork = {
        name: body.name,
        desc: {
            descText: body.desc.descText,
            creationYear: new Date(body.desc.creationYear),
        },
        value: Number(body.value),
        available: avail,
        category: cat,
        img: {
            data: imgData,
            contentType: imgMimeType
        },
        maker: body.maker,
        plrty: {
            likes: body.plrty.likes,
            dislikes: body.plrty.dislikes
        }
    };
    modImgData = '';
    modImgMimeType = '';
    await service.update(id, modWork);
    return await service.findOne(id);
};

workCtrl.delete = async(id) => {
    return await service.delete({ _id: id });
};

module.exports = workCtrl;
