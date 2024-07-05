const Assessments = require('../service/assessmentService')

module.exports = {
    listAssessment, getAssessment, updateAssessment, addAssessment, deleteAssessment
}

async function listAssessment(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {
        res.json(await Assessments.list())
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function getAssessment(req, res, next) {
    // console.log("called")
    const { id } = req.params
    const assessments = await Assessments.get(id)
    if (!assessments) return next()
    res.json(assessments)
}

async function updateAssessment(req, res) {
    console.log("called update")
    const { id } = req.params;
    const updatedAssessment = req.body;
    try {
        const assessment = await Assessments.update(id, updatedAssessment);
        if (!assessment) return res.status(404).json({ error: 'Assessment not found' });
        res.json(assessment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function addAssessment(req, res) {
    console.log("called add")
    const newAssessment = req.body;
    try {
        const assessment = await Assessments.add(newAssessment);
        res.status(201).json(assessment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteAssessment(req, res) {
    const { id } = req.params;
    try {
        const assessment = await Assessments.remove(id);
        if (!assessment) return res.status(404).json({ error: 'Assessment not found' });
        res.json({ message: 'Assessment deleted successfully', assessment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}