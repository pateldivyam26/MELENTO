const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')
const assessmentFile = path.join(__dirname, '../data/assessment.json')

function find() {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('assessment')
            var items = coll.find().toArray();
            resolve(items);
        } catch (err) {
            reject(err);
        }
    })
}

function add(assessment) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('assessment')
            util.renameKey(assessment, 'id', '_id');
            resolve(util.addObject(coll, assessment));
        } catch (err) {
            reject(err);
        }
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('assessment');
            var query = { _id: id };
            const assessment = coll.findOne(query);
            resolve(assessment);
        } catch (err) {
            reject(err);
        }
    });
}

function update(id, updatedAssessment) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('assessment');
            util.renameKey(updatedAssessment, 'id', '_id');
            resolve(util.updateObject(coll, id, updatedAssessment));
        } catch (err) {
            reject(err);
        }
    });
}

function remove(id, deletedAssessment) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('assessment');
            util.renameKey(deletedAssessment, 'id', '_id');
            resolve(util.deleteObject(coll, id, deletedAssessment));
        } catch (err) {
            reject(err);
        }
    });
}
module.exports = {
    add, update, remove, find, getById
}