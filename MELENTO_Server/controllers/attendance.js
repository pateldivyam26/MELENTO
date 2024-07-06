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
            console.log('Promise Rejected')
            console.log(err)
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
    });
}

function addAttendance(req, res) {
    res.setHeader('Content-Type', 'application/json')
    console.log("Add called")
    var id = req.body.id
    var attendance = req.body
    attendance_service.add(attendance).then(
        res.send(JSON.stringify({ data_submitted: id }))
    )
}

function updateAttendance(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Update called");

    var id = req.params.id;
    var attendance = req.body;

    attendance_service.update(id, attendance);
    res.send(JSON.stringify({ data_updated: id }));
}

function deleteAttendance(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Delete called");

    var id = req.params.id;
    var attendance = req.body;

    attendance_service.remove(id, attendance);
    res.send(JSON.stringify({ data_deleted: id }));
}

module.exports = {
    getAttendance, getAttendanceById, updateAttendance, addAttendance, deleteAttendance
}