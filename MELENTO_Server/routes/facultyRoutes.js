const express = require('express');
const router = express.Router();
const faculty_controller = require('../controllers/faculty');
const auth_controller = require('../controllers/auth');

router.get('', auth_controller.authenticateToken, faculty_controller.getFaculty);

router.get('/:id', auth_controller.authenticateToken, faculty_controller.getFacultyById);

router.post('', auth_controller.authenticateToken, faculty_controller.addFaculty);

router.put('/:id', auth_controller.authenticateToken, faculty_controller.updateFaculty);

router.delete('/:id', auth_controller.authenticateToken, faculty_controller.deleteFaculty);

module.exports = router;
