const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')

function find() {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('trainee')
            var items = coll.find().toArray();
            resolve(items);
        } catch (err) {
            reject(err);
        }
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('trainee');
            var query = { _id: id };
            const trainee = coll.findOne(query);
            resolve(trainee);
        } catch (err) {
            reject(err);
        }
    });
}

function add(trainee) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('trainee')
            util.renameKey(trainee, 'id', '_id');
            resolve(util.addObject(coll, trainee));
        } catch (err) {
            reject(err);
        }
    })
}

function update(id, updatedTrainee) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('trainee');
            util.renameKey(updatedTrainee, 'id', '_id');
            resolve(util.updateObject(coll, id, updatedTrainee));
        } catch (err) {
            reject(err);
        }
    });
}

function remove(id, deletedTrainee) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('trainee');
            util.renameKey(deletedTrainee, 'id', '_id');
            resolve(util.deleteObject(coll, id, deletedTrainee));
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    add, update, remove, find, getById
}