const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')
const assessmentFile = path.join(__dirname, '../data/assessment.json')

var findAssessment = function () {
    return new Promise((resolve, reject) => {
        var coll = util.connect('assessment')
        var items = coll.find().toArray();
        resolve(items);
    })
}



function add(assessment) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('assessment')
        util.renameKey(assessment,'id','_id');
        resolve(util.addObject(coll, assessment));
    })
}



function update(id,updatedAssessment) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('assessment');
        util.renameKey(updatedAssessment,'id','_id');
        resolve(util.updateObject(coll, id,updatedAssessment));
    });
}

async function list() {
    const data = await fs.readFile(assessmentFile)
    return JSON.parse(data)
}

async function get(id) {
    const assessments = JSON.parse(await fs.readFile(assessmentFile))
    for (let i = 0; i < assessments.length; i++) {
        if (assessments[i].id == id) {
            return assessments[i]
        }
    }
    return null
}

// async function update(id, updatedAssessment) {
//     const assessments = JSON.parse(await fs.readFile(assessmentFile));
//     const index = assessments.findIndex(a => a.id == id);
//     if (index === -1) return null;
//     assessments[index] = { ...assessments[index], ...updatedAssessment };
//     await fs.writeFile(assessmentFile, JSON.stringify(assessments));
//     return assessments[index];
// }

// async function add(newAssessment) {
//     const assessments = JSON.parse(await fs.readFile(assessmentFile));
//     newAssessment.id = assessments.length ? Math.max(...assessments.map(a => a.id)) + 1 : 1;
//     assessments.push(newAssessment);
//     await fs.writeFile(assessmentFile, JSON.stringify(assessments));
//     return newAssessment;
// }

async function remove(id) {
    const assessments = JSON.parse(await fs.readFile(assessmentFile));
    const index = assessments.findIndex(assessment => assessment.id == id);
    if (index === -1) return null;

    const removedAssessment = assessments.splice(index, 1);
    await fs.writeFile(assessmentFile, JSON.stringify(assessments, null, 2));
    return removedAssessment[0];
}

module.exports = {
    list, get, add, update, remove, findAssessment
}