const express = require('express');
const router = express.Router();
const trainee_controller = require('../controllers/trainee');
const auth_controller = require('../controllers/auth');

router.get('', auth_controller.authenticateToken, trainee_controller.getTrainee);

router.get('/:id', auth_controller.authenticateToken, trainee_controller.getTraineeById);

router.post('', auth_controller.authenticateToken, trainee_controller.addTrainee);

router.put('/:id', auth_controller.authenticateToken, trainee_controller.updateTrainee);

router.delete('/:id', auth_controller.authenticateToken, trainee_controller.deleteTrainee);

module.exports = router;
