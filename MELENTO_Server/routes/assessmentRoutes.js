const express = require('express');
const router = express.Router();
const assessment_controller = require('../controllers/assessment');
const auth_controller=require('../controllers/auth');

router.get('/',assessment_controller.getAssessment);
router.get('/:id', assessment_controller.getAssessmentById);
router.post('/', auth_controller.authenticateToken,assessment_controller.addAssessment);
router.put('/:id',auth_controller.authenticateToken, assessment_controller.updateAssessment);
router.delete('/:id',auth_controller.authenticateToken, assessment_controller.deleteAssessment);

module.exports = router;