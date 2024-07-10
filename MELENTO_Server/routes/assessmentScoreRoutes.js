const express = require('express');
const router = express.Router();
const score_controller = require('../controllers/assessmentScore');
const auth_controller = require('../controllers/auth');

router.get('', auth_controller.authenticateToken, score_controller.getScore);

router.get('/:id', auth_controller.authenticateToken, score_controller.getScoreById);

router.post('', auth_controller.authenticateToken, score_controller.addScore);

router.put('/:id', auth_controller.authenticateToken, score_controller.updateScore);

router.delete('/:id', auth_controller.authenticateToken, score_controller.deleteScore);

module.exports = router;
