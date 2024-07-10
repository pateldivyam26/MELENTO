const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')

function find() {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('assessment_score')
            var items = coll.find().toArray();
            resolve(items);
        } catch (error) {
            reject(error);
        }
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('assessment_score');
            var query = { _id: id };
            const score = coll.findOne(query);
            resolve(score);
        } catch (error) {
            reject(error);
        }
    });
}

function add(score) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('assessment_score')
            util.renameKey(score, 'id', '_id');
            resolve(util.addObject(coll, score));
        } catch (error) {
            reject(error);
        }
    })
}

function update(id, updatedScore) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('assessment_score');
            util.renameKey(updatedScore, 'id', '_id');
            resolve(util.updateObject(coll, id, updatedScore));
        } catch (error) {
            reject(error);
        }
    });
}

function remove(id, deletedScore) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('assessment_score');
            util.renameKey(deletedScore, 'id', '_id');
            resolve(util.deleteObject(coll, id, deletedScore));
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    add, update, remove, find, getById
}