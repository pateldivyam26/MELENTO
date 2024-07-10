const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/category');
const auth_controller = require('../controllers/auth');

router.get('',category_controller.getCategory);

router.get('/:id',category_controller.getCategoryById);

router.post('', auth_controller.authenticateToken, category_controller.addCategory);

router.put('/:id', auth_controller.authenticateToken, category_controller.updateCategory);

router.delete('/:id', auth_controller.authenticateToken, category_controller.deleteCategory);

module.exports = router;
