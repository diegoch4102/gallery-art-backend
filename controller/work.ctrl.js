const WorksService = require("./../services/work.service");
// const fs = require('fs');
// const path = require('path')

const service = new WorksService();

const workCtrl = {};

workCtrl.getAll = async() => {
    return new Promise((resolve) => {
        resolve(service.find());
    });
    // let works = await service.find();
    // console.log(`[ctrl] ${works}`);
    // return works;
};

workCtrl.getOne = async(id) => {
    let works = await service.findOne(id);
    return works;
};


workCtrl.addNew = async(work, file) => {
    console.log(file);
};

// workCtrl.addNew = async(work, file) => {
//     let avail = true;
//     if (work.available !== 'true') { avail = !true; }
//     let imgData = `http://localhost:1600/public/images/${file.originalname}`;
//     // let imgData = await fs.readFile(path.join(`${__dirname}/uploads/${file.filename}`));
//     let newWork = {
//         name: work.name,
//         desc: {
//             descText: work.desc.descText,
//             creationYear: work.desc.creationYear,
//         },
//         value: Number(work.value),
//         available: avail,
//         category: work.category,
//         img: {
//             data: imgData,
//             contentType: file.mimetype
//         },
//         maker: work.maker,
//         plrty: {
//             likes: work.plrty.likes,
//             dislikes: work.plrty.dislikes
//         }
//     };
//     return await service.create(newWork);
// };

workCtrl.updateOne = async(id, work) => {
    return await service.update(id, work);
};

workCtrl.delete = async(id) => {
    await service.deleteOne({ _id: id });
};

module.exports = workCtrl;
