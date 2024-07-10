const assessment_service = require('../service/assessmentService')
const util = require('../utility/util')

function getAssessment(req, res) {
    res.setHeader('Content-Type', 'application/json')
    assessment_service.find().then(
        (items) => {
            const objArr = items;
            objArr.forEach((obj) => {
                util.renameKey(obj, "_id", "id");
            });
            const updateItems = JSON.stringify(objArr);
            res.send(updateItems);
        },
        (err) => {
            res.status(500).json({ error: 'An error occurred while fetching assessments' });
        }
    )
}

function getAssessmentById(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    assessment_service.getById(id).then((assessment) => {
        if (!assessment) {
            res.status(404).json({ error: 'Assessment not found' });
        } else {
            util.renameKey(assessment, '_id', 'id');
            res.json(assessment);
        }
    }).catch((err) => {
        res.status(500).json({ error: 'An error occurred while fetching the assessment' });
    });
}

function addAssessment(req, res) {
    res.setHeader('Content-Type', 'application/json')
    var id = req.body.id
    var assessment = req.body
    assessment_service.add(assessment).then(
        () => res.send(JSON.stringify({ data_submitted: id })),
        (err) => res.status(500).json({ error: 'An error occurred while adding the assessment' })
    )
}

function updateAssessment(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    var assessment = req.body;

    assessment_service.update(id, assessment).then(
        () => res.send(JSON.stringify({ data_updated: id })),
        (err) => res.status(500).json({ error: 'An error occurred while updating the assessment' })
    );
}

function deleteAssessment(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    var assessment = req.body;

    assessment_service.remove(id, assessment).then(
        () => res.send(JSON.stringify({ data_deleted: id })),
        (err) => res.status(500).json({ error: 'An error occurred while deleting the assessment' })
    );
}

module.exports = {
    getAssessment, getAssessmentById, updateAssessment, addAssessment, deleteAssessment
}