const express = require('express');
const router = express.Router();
const attendance_controller = require('../controllers/attendance');
const auth_controller = require('../controllers/auth');

router.get('', auth_controller.authenticateToken, attendance_controller.getAttendance);

router.get('/:id', auth_controller.authenticateToken, attendance_controller.getAttendanceById);

router.post('', auth_controller.authenticateToken, attendance_controller.addAttendance);

router.put('/:id', auth_controller.authenticateToken, attendance_controller.updateAttendance);

router.delete('/:id', auth_controller.authenticateToken, attendance_controller.deleteAttendance);

module.exports = router;
