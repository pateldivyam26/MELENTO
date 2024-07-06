const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')

function find() {
    return new Promise((resolve, reject) => {
        var coll = util.connect('trainee')
        var items = coll.find().toArray();
        resolve(items);
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('trainee');
        var query = { _id: id };
        const trainee = coll.findOne(query);
        resolve(trainee);
    });
}

function add(trainee) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('trainee')
        util.renameKey(trainee, 'id', '_id');
        resolve(util.addObject(coll, trainee));
    })
}

function update(id, updatedTrainee) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('trainee');
        util.renameKey(updatedTrainee, 'id', '_id');
        resolve(util.updateObject(coll, id, updatedTrainee));
    });
}

function remove(id, deletedTrainee) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('trainee');
        util.renameKey(deletedTrainee, 'id', '_id');
        resolve(util.deleteObject(coll, id, deletedTrainee));
    });
}

module.exports = {
    add, update, remove, find, getById
}