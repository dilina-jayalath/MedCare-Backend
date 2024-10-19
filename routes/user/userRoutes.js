const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController');
const authController = require('../../controllers/auth/authController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;