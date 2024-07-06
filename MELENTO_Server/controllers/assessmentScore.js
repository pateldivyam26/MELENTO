const score_service = require('../service/assessmentScoreService')
const util = require('../utility/util')

function getScore(req, res) {
    res.setHeader('Content-Type', 'application/json')
    score_service.find().then(
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

function getScoreById(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    score_service.getById(id).then((score) => {
        if (!score) {
            res.status(404).json({ error: 'Score not found' });
        } else {
            util.renameKey(score, '_id', 'id');
            res.json(score);
        }
    });
}

function addScore(req, res) {
    res.setHeader('Content-Type', 'application/json')
    console.log("Add called")
    var id = req.body.id
    var score = req.body
    score_service.add(score).then(
        res.send(JSON.stringify({ data_submitted: id }))
    )
}

function updateScore(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Update called");

    var id = req.params.id;
    var score = req.body;

    score_service.update(id, score);
    res.send(JSON.stringify({ data_updated: id }));
}

function deleteScore(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Delete called");

    var id = req.params.id;
    var score = req.body;

    score_service.remove(id, score);
    res.send(JSON.stringify({ data_deleted: id }));
}

module.exports = {
    getScore, getScoreById, updateScore, addScore, deleteScore
}