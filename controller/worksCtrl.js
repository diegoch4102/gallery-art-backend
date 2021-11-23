const workDAO = require("../model/workDAO");

const worksCtrl = {};

worksCtrl.getAll = async() => {
    let works = await workDAO.find();
    return works;
};

worksCtrl.putNew = async(work) => {
    return await workDAO.create(work);
};

worksCtrl.update = async(work) => {
    let idWork = work._id;
    delete work._id;
    return await workDAO.findByIdAndUpdate(idWork, work);
};

worksCtrl.delete = async(id) => {
    await workDAO.deleteOne({ _id: id });
};

module.exports = worksCtrl;