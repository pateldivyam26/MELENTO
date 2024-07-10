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
            res.json(objArr);
        },
        (err) => {
            console.error('Promise Rejected', err);
            res.status(500).json({ error: 'Failed to get scores' });
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
    }).catch((err) => {
        console.error('Promise Rejected', err);
        res.status(500).json({ error: 'Failed to get score' });
    });
}

function addScore(req, res) {
    res.setHeader('Content-Type', 'application/json')
    console.log("Add called")
    var score = req.body
    score_service.add(score).then(() => {
        res.json({ data_submitted: score.id });
    }).catch((err) => {
        console.error('Promise Rejected', err);
        res.status(500).json({ error: 'Failed to add score' });
    });
}

function updateScore(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Update called");

    var id = req.params.id;
    var score = req.body;

    score_service.update(id, score).then(() => {
        res.json({ data_updated: id });
    }).catch((err) => {
        console.error('Promise Rejected', err);
        res.status(500).json({ error: 'Failed to update score' });
    });
}

function deleteScore(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Delete called");

    var id = req.params.id;
    var score = req.body;

    score_service.remove(id, score).then(() => {
        res.json({ data_deleted: id });
    }).catch((err) => {
        console.error('Promise Rejected', err);
        res.status(500).json({ error: 'Failed to delete score' });
    });
}

module.exports = {
    getScore, getScoreById, updateScore, addScore, deleteScore
}