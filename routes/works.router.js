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

router.get('/', async(req, res, next) => {
    workCtrl.getAll()
        .then((works) => {
            res.json(works);
        })
        .catch(error => {
            next(error);
        });
});

router.get('/categories/', async(req, res, next) => {
    workCtrl.getCategories()
        .then((categories) => {
            res.json(categories);
        })
        .catch(error => {
            next(error);
        });
});

router.get('/:id', async(req, res, next) => {
    const { id } = req.params;
    await workCtrl.getOne(id)
        .then((user) => {
            res.json(user);
        })
        .catch(error => {
            next(error);
        });
});

router.get('/category/:idCategory', async(req, res, next) => {
    const { idCategory } = req.params;
    workCtrl.getOneCategory(idCategory)
        .then((category) => {
            res.json(category);
        })
        .catch(error => {
            next(error);
        });
});

router.post('/',
    upload.single('data'),
    async(req, res, next) => {
        // console.group('[HEADERS]');
        // console.log(req.headers);
        // console.groupEnd();
        console.group('[FILE]');
        console.log(req.file);
        console.groupEnd();
        console.group('[BODY]');
        console.log(req.body);
        console.groupEnd();

        // req.body.image.data = await fs.readFile(path.join(`${__dirname}/uploads/${req.file.filename}`));
        // console.log(`image.data type ${typeof req.body.image.data}`);
        // req.body.image.contentType = "image/png";
        workCtrl.addNew(req.body, req.file)
            .then((newWork) => {
                res.status(201).json(newWork);
            })
            .catch(error => {
                next(error);
            });
    });

router.post('/imgPatch/',
    upload.single('data'),
    async(req, res, next) => {
        // console.group('[FILE]');
        // console.log(req.file);
        // console.groupEnd();
        await workCtrl.modifyImg(req.file)
            // SIN ESTE MÉTODO FALLA INTENTAR ENCERRAR img 👇🏻 ETRE PARÉNTESIS
            .then(img => {
                res.status(201).json(img);
            })
            .catch(error => {
                next(error);
            });
    });

router.put('/:id',
    async(req, res, next) => {
        // console.group('[HEADERS]');
        // console.log(req.headers);
        // console.groupEnd();
        console.group('[BODY]');
        console.log(req.body);
        console.groupEnd();
        try {
            const { id } = req.params;
            // if (req.file !== undefined) {
            // const mod = await workCtrl.updateOne(id, req.body, req.file);
            // console.group('[response]');
            // console.log(mod);
            // console.groupEnd();
            // res.json(mod);
            // } else {
            const user = await workCtrl.updateOne(id, req.body);
            res.json(user);
            // }
        } catch (error) {
            next(error);
        }
    });

router.delete('/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        const respuesta = await workCtrl.delete(id);
        res.json(respuesta);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
