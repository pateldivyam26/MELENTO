const trainee_service = require('../service/traineeService')
const util = require('../utility/util')

function getTrainee(req, res) {
    res.setHeader('Content-Type', 'application/json')
    trainee_service.find().then(
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

function getTraineeById(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    trainee_service.getById(id).then((trainee) => {
        if (!trainee) {
            res.status(404).json({ error: 'Trainee not found' });
        } else {
            util.renameKey(trainee, '_id', 'id');
            res.json(trainee);
        }
    });
}

function addTrainee(req, res) {
    res.setHeader('Content-Type', 'application/json')
    console.log("Add called")
    var id = req.body.id
    var trainee = req.body
    trainee_service.add(trainee).then(
        res.send(JSON.stringify({ data_submitted: id }))
    )
}

function updateTrainee(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Update called");

    var id = req.params.id;
    var trainee = req.body;

    trainee_service.update(id, trainee);
    res.send(JSON.stringify({ data_updated: id }));
}

function deleteTrainee(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Delete called");

    var id = req.params.id;
    var trainee = req.body;

    trainee_service.remove(id, trainee);
    res.send(JSON.stringify({ data_deleted: id }));
}

module.exports = {
    getTrainee, getTraineeById, updateTrainee, addTrainee, deleteTrainee
}