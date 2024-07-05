const assessment_service = require('../service/assessmentService')
const util = require('../utility/util')

function getAssessment(req,res){
    res.setHeader('Content-Type', 'application/json')
    assessment_service.findAssessment().then(
        (items)=>{
            const objArr = items;
            objArr.forEach((obj)=>{
                util.renameKey(obj,"_id","id");
            });
            const updateItems = JSON.stringify(objArr);
            res.send(updateItems);
        },
        (err)=>{
            console.log('Promise Rejected')
            console.log(err)
        }
    )
}

function addAssessment(req,res){
    res.setHeader('Content-Type', 'application/json')
    console.log("Add called")
    var id = req.body.id
    var assessment=req.body
    assessment_service.add(assessment).then(
        res.send(JSON.stringify({data_submitted: id}))
    )
}

function updateAssessment(req,res){
    res.setHeader('Content-Type', 'application/json');
    console.log("Update called");

    var id = req.params.id;
    var assessment=req.body;

    assessment_service.update(id,assessment);
    res.send(JSON.stringify({ data_updated: id }));
}

// async function listAssessment(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     try {
//         res.json(await assessment_service.list())
//     }
//     catch (err) {
//         res.status(500).json({ error: err.message })
//     }
// }

// async function getAssessment(req, res, next) {
//     // console.log("called")
//     const { id } = req.params
//     const assessments = await Assessments.get(id)
//     if (!assessments) return next()
//     res.json(assessments)
// }

// async function updateAssessment(req, res) {
//     console.log("called update")
//     const { id } = req.params;
//     const updatedAssessment = req.body;
//     try {
//         const assessment = await assessment_service.update(id, updatedAssessment);
//         if (!assessment) return res.status(404).json({ error: 'Assessment not found' });
//         res.json(assessment);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }

// async function addAssessment(req, res) {
//     console.log("called add")
//     const newAssessment = req.body;
//     try {
//         const assessment = await assessment_service.add(newAssessment);
//         res.status(201).json(assessment);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }

async function deleteAssessment(req, res) {
    const { id } = req.params;
    try {
        const assessment = await assessment_service.remove(id);
        if (!assessment) return res.status(404).json({ error: 'Assessment not found' });
        res.json({ message: 'Assessment deleted successfully', assessment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    getAssessment, updateAssessment, addAssessment, deleteAssessment
}