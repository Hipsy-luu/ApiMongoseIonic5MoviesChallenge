const express = require('express');
const router = express.Router();
const controller = require('../controllers/rolesController');

//obtener todos los roles
router.get('/', controller.list);//OK
//Obtener un rol por id
router.get('/:id', controller.index);//OK
//Crear un rol
router.post('/', controller.create);//OK
//Actualizar un rol por id
router.put('/:id', controller.update);//OK
//Eliminar un rol por id
router.delete('/:id', controller.destroy);

module.exports = router;