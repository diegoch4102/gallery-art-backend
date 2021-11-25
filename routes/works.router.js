const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const service = require('./../services/work.service');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.filename}-${Date.now()}`);
    }
});
var upload = multer({ storage: storage });

router.get('/', async(req, res) => {
    const works = await service.find();
    res.json(works);
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
});

router.post('/',
    upload.single('image'),
    async(req, res) => {
        req.body.image.data = await fs.readFile(path.join(`${__dirname}/uploads/${req.file.filename}`))
        req.body.image.contentType = "image/png";
        const newUser = await service.create(req.body);
        res.status(201).json(newUser);
    });

router.patch('/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const user = await service.update(id, body);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const respuesta = await service.delete(id);
    res.json(respuesta);
});

module.exports = router;
