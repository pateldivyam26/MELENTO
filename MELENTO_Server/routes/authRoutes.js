const express = require('express');
const router = express.Router();
const auth_controller=require('../controllers/auth')

router.post('/',auth_controller.login)

module.exports = router;
