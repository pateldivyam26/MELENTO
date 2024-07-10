const express = require('express');
const router = express.Router();
const course_controller = require('../controllers/course');
const auth_controller = require('../controllers/auth');

router.get('', auth_controller.authenticateToken, course_controller.getCourse);

router.get('/:id', auth_controller.authenticateToken, course_controller.getCourseById);

router.post('', auth_controller.authenticateToken, course_controller.addCourse);

router.put('/:id', auth_controller.authenticateToken, course_controller.updateCourse);

router.delete('/:id', auth_controller.authenticateToken, course_controller.deleteCourse);

module.exports = router;