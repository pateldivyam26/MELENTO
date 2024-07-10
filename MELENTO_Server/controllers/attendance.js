const attendance_service = require('../service/attendanceService')
const util = require('../utility/util')

function getAttendance(req, res) {
    res.setHeader('Content-Type', 'application/json')
    attendance_service.find().then(
        (items) => {
            const objArr = items;
            objArr.forEach((obj) => {
                util.renameKey(obj, "_id", "id");
            });
            const updateItems = JSON.stringify(objArr);
            res.send(updateItems);
        },
        (err) => {
            res.status(500).json({ error: 'An error occurred while fetching attendances' });
        }
    )
}

function getAttendanceById(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    attendance_service.getById(id).then((attendance) => {
        if (!attendance) {
            res.status(404).json({ error: 'Attendance not found' });
        } else {
            util.renameKey(attendance, '_id', 'id');
            res.json(attendance);
        }
    }).catch((err) => {
        res.status(500).json({ error: 'An error occurred while fetching the attendance' });
    });
}

function addAttendance(req, res) {
    res.setHeader('Content-Type', 'application/json')
    var id = req.body.id
    var attendance = req.body
    attendance_service.add(attendance).then(
        () => res.send(JSON.stringify({ data_submitted: id })),
        (err) => res.status(500).json({ error: 'An error occurred while adding the attendance' })
    )
}

function updateAttendance(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    var attendance = req.body;

    attendance_service.update(id, attendance).then(
        () => res.send(JSON.stringify({ data_updated: id })),
        (err) => res.status(500).json({ error: 'An error occurred while updating the attendance' })
    );
}

function deleteAttendance(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    var attendance = req.body;

    attendance_service.remove(id, attendance).then(
        () => res.send(JSON.stringify({ data_deleted: id })),
        (err) => res.status(500).json({ error: 'An error occurred while deleting the attendance' })
    );
}

module.exports = {
    getAttendance, getAttendanceById, updateAttendance, addAttendance, deleteAttendance
}