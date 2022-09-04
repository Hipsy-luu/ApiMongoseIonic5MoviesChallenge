const express = require('express');
const router = express.Router();
const controller = require('../controllers/moviesController');

//get all movies 
router.get('/', controller.list);//OK
//get movie by id
router.get('/:id', controller.index);//OK
//create movie
router.post('/', controller.create);//OK
//update movie by id
router.put('/:id', controller.update);//OK
//delete movie by id
router.delete('/:id', controller.destroy);

module.exports = router;