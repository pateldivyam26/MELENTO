const express = require('express');
const router = express.Router();
const cart_controller = require('../controllers/cart');
const auth_controller = require('../controllers/auth');

router.get('', auth_controller.authenticateToken, cart_controller.getCart);

router.get('/:id', auth_controller.authenticateToken, cart_controller.getCartById);

router.post('', auth_controller.authenticateToken, cart_controller.addCart);

router.put('/:id', auth_controller.authenticateToken, cart_controller.updateCart);

router.delete('/:id', auth_controller.authenticateToken, cart_controller.deleteCart);

module.exports = router;
