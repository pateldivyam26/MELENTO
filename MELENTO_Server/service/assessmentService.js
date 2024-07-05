const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')
const assessmentFile = path.join(__dirname, '../data/assessment.json')
const { rejects } = require('assert')

var findAssessment = function () {
    return new Promise((resolve, reject) => {
        var coll = util.connect('assessment')
        var items = coll.find().toArray();
        resolve(items);
    })
}

function addObject(collection, object) {
    collection.insertOne(object, function (err, result) {
        if (!err) {
            console.log('Inserted: ')
            console.log(result)
        }
    })
}

function add(id,assessmentName,assessmentDate,assessmentTime,assessmentImage,assessmentDescription,questions,facultyId,totalMarks,price,active) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('assessment')
        resolve(addObject(coll,{
            _id:id,
            assessmentName:assessmentName,
            assessmentDate:assessmentDate,
            assessmentTime:assessmentTime,
            assessmentImage:assessmentImage,
            assessmentDescription:assessmentDescription,
            questions:questions,
            facultyId:facultyId,
            totalMarks:totalMarks,
            price:price,
            active:active
        }));
    })
}

function updateObject(collection, id, updatedObject) {
    return collection.updateOne({ _id: id }, { $set: updatedObject }, function (err, result) {
        if (!err) {
            console.log('Updated: ')
            console.log(result)
        } else {
            console.error('Error updating object: ', err);
        }
    });
}

function update(id, assessmentName, assessmentDate, assessmentTime, assessmentImage, assessmentDescription, questions, facultyId, totalMarks, price, active) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('assessment');
        resolve(updateObject(coll, id, {
            assessmentName: assessmentName,
            assessmentDate: assessmentDate,
            assessmentTime: assessmentTime,
            assessmentImage: assessmentImage,
            assessmentDescription: assessmentDescription,
            questions: questions,
            facultyId: facultyId,
            totalMarks: totalMarks,
            price: price,
            active: active
        }));
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