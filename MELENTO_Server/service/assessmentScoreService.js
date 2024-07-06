const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')

function find() {
    return new Promise((resolve, reject) => {
        var coll = util.connect('assessment_score')
        var items = coll.find().toArray();
        resolve(items);
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('assessment_score');
        var query = { _id: id };
        const score = coll.findOne(query);
        resolve(score);
    });
}

function add(score) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('assessment_score')
        util.renameKey(score, 'id', '_id');
        resolve(util.addObject(coll, score));
    })
}

function update(id, updatedScore) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('assessment_score');
        util.renameKey(updatedScore, 'id', '_id');
        resolve(util.updateObject(coll, id, updatedScore));
    });
}

function remove(id, deletedScore) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('assessment_score');
        util.renameKey(deletedScore, 'id', '_id');
        resolve(util.deleteObject(coll, id, deletedScore));
    });
}

module.exports = {
    add, update, remove, find, getById
}