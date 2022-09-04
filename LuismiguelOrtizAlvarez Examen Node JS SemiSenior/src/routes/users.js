const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

//get all users
router.get('/', controller.list);
//obtain user by id
router.get('/:id', controller.index);
//add user
router.post('/register', controller.create);
//update user
router.put('/:id', controller.update);
//delete user
router.delete('/:id', controller.destroy);

module.exports = router;
