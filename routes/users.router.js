const express = require('express');
const usersCtrl = require('./../controller/usersCtrl');
// const validatorHandler = require('./../middlewares/validator.handler');

const router = express.Router();


router.get('/', async(req, res) => {
    usersCtrl.getAll()
        .then((users) => {
            res.json(users);
        })
        .catch(e => {
            res.send(e);
        });
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    usersCtrl.getOne(id)
        .then(user => {
            res.json(user);
        })
        .catch(e => {
            res.send(e);
        });

});

router.post('/', async(req, res) => {
    usersCtrl.addNew(req.body)
        .then((users) => {
            res.status(201).json(newUser);
        })
        .catch(e => {
            res.send(e);
        });
});

router.patch('/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const user = await usersCtrl.update(id, body);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const respuesta = await usersCtrl.delete(id);
    res.json(respuesta);
});

module.exports = router;