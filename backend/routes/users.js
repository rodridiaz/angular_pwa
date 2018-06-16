const express = require('express');

const UserController = require('../controllers/user');
const extractFile = require('../middleware/file');

const router = express.Router();

router.post('', extractFile, UserController.createUser);

router.put('/:id', extractFile, UserController.updateUser);

router.get('', UserController.getUsers);

router.get('/:id', UserController.getUser);

router.delete('/:id', UserController.deteteUser);

module.exports = router;
