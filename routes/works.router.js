const express = require('express');
const multer = require('multer');
const workCtrl = require('./../controller/work.ctrl');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        // cb(null, `${file.fieldname}-${Date.now()}`);
        cb(null, `${file.originalname}`);
    }
});
var upload = multer({ storage: storage });

router.get('/', async(req, res) => {
    workCtrl.getAll()
        .then((works) => {
            res.json(works);
        })
        .catch(e => {
            res.send(e);
        });
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const user = await workCtrl.getOne(id);
    res.json(user);
});

router.post('/',
    upload.single('img'),
    async(req, res) => {
        console.log(req.file);
        console.log(req.body);
        // req.body.image.data = await fs.readFile(path.join(`${__dirname}/uploads/${req.file.filename}`));
        // console.log(`image.data type ${typeof req.body.image.data}`);
        // req.body.image.contentType = "image/png";

        // const newUser = await workCtrl.addNew(req.body, req.file);
        // res.status(201).json(newUser);
        res.status(201);
    });

router.patch('/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const user = await workCtrl.updateOne(id, body);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const respuesta = await workCtrl.delete(id);
    res.json(respuesta);
});

module.exports = router;
