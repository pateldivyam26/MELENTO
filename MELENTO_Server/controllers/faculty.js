const faculty_service = require('../service/facultyService')
const util = require('../utility/util')

function getFaculty(req, res) {
    res.setHeader('Content-Type', 'application/json')
    faculty_service.find().then(
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

function getFacultyById(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    faculty_service.getById(id).then((faculty) => {
        if (!faculty) {
            res.status(404).json({ error: 'Faculty not found' });
        } else {
            util.renameKey(faculty, '_id', 'id');
            res.json(faculty);
        }
    });
}

function addFaculty(req, res) {
    res.setHeader('Content-Type', 'application/json')
    console.log("Add called")
    var id = req.body.id
    var faculty = req.body
    faculty_service.add(faculty).then(
        res.send(JSON.stringify({ data_submitted: id }))
    )
}

function updateFaculty(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Update called");

    var id = req.params.id;
    var faculty = req.body;

    faculty_service.update(id, faculty);
    res.send(JSON.stringify({ data_updated: id }));
}

function deleteFaculty(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Delete called");

    var id = req.params.id;
    var faculty = req.body;

    faculty_service.remove(id, faculty);
    res.send(JSON.stringify({ data_deleted: id }));
}

module.exports = {
    getFaculty, getFacultyById, updateFaculty, addFaculty, deleteFaculty
}