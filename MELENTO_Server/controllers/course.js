const course_service = require('../service/courseService')
const util = require('../utility/util')

function getCourse(req, res) {
    res.setHeader('Content-Type', 'application/json')
    course_service.find().then(
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

function getCourseById(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    course_service.getById(id).then((course) => {
        if (!course) {
            res.status(404).json({ error: 'Course not found' });
        } else {
            util.renameKey(course, '_id', 'id');
            res.json(course);
        }
    });
}

function addCourse(req, res) {
    res.setHeader('Content-Type', 'application/json')
    console.log("Add called")
    var id = req.body.id
    var course = req.body
    course_service.add(course).then(
        res.send(JSON.stringify({ data_submitted: id }))
    )
}

function updateCourse(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Update called");

    var id = req.params.id;
    var course = req.body;

    course_service.update(id, course);
    res.send(JSON.stringify({ data_updated: id }));
}

function deleteCourse(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Delete called");

    var id = req.params.id;
    var course = req.body;

    course_service.remove(id, course);
    res.send(JSON.stringify({ data_deleted: id }));
}

module.exports = {
    getCourse, getCourseById, updateCourse, addCourse, deleteCourse
}