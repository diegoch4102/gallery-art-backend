const express = require('express');
const usersCtrl = require('./../controller/usersCtrl');
const validatorHandler = require('./../middlewares/validator.handler');
const { createUser, updateUser, getUser } = require('./../model/user.schema');

const router = express.Router();

/* El uso de try/catch en cada método es la práctica usada para el
manejo de errores, en conjunto con middlewares para errores */

router.get('/', async(req, res, next) => {
    usersCtrl.getAll()
        .then((users) => {
            res.json(users);
        })
        .catch(error => {
            /* En lugar de envíar el error al usuario, el error es
            pasado a los middlewares creados para los errores */
            // res.send(e);
            next(error);
        });
});

router.get('/:id',
    validatorHandler(getUser, 'params'),
    async(req, res, next) => {
        const { id } = req.params;
        usersCtrl.getOne(id)
            .then(user => {
                res.json(user);
            })
            .catch(error => {
                /* En lugar de envíar el error al usuario, el error es
          pasado a los middlewares creados para los errores */
                // res.send(e);
                next(error);
            });

    });

router.post('/',
    validatorHandler(createUser, 'body'),
    async(req, res, next) => {
        console.group('[HEADERS]');
        console.log(req.headers);
        console.groupEnd();
        console.group('[BODY]');
        console.log(req.body);
        console.groupEnd();
        try {
            const confirmation = await usersCtrl.addNew(req.body);
            console.group('[Response from ctrl]');
            console.log(confirmation);
            console.groupEnd();
            res.status(201).json(confirmation);
        } catch (error) {
            /* En lugar de envíar el error al usuario, el error es
              pasado a los middlewares creados para los errores */
            // res.send(e);
            next(error);
        }
    });

router.put('/:id',
    validatorHandler(getUser, 'params'),
    validatorHandler(createUser, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const user = await usersCtrl.update(id, body);
            res.json(user);
        } catch (error) {
            /* En lugar de envíar el error al usuario, el error es
              pasado a los middlewares creados para los errores */
            // res.send(e);
            next(error);
        }
    });

router.delete('/:id',
    validatorHandler(getUser, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const respuesta = await usersCtrl.delete(id);
            res.json(respuesta);
        } catch (error) {
            /* En lugar de envíar el error al usuario, el error es
                pasado a los middlewares creados para los errores */
            // res.send(e);
            next(error);
        }
    });

module.exports = router;
