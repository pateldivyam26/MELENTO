const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user');
const auth_controller = require('../controllers/auth');

router.get('', auth_controller.authenticateToken, user_controller.getUser);

router.get('/:id', auth_controller.authenticateToken, user_controller.getUserById);

router.post('', auth_controller.authenticateToken, user_controller.addUser);

router.put('/:id', auth_controller.authenticateToken, user_controller.updateUser);

router.delete('/:id', auth_controller.authenticateToken, user_controller.deleteUser);

module.exports = router;
