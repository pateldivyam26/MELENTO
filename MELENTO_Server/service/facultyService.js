const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')

function find() {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('faculty')
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
            var coll = util.connect('faculty');
            var query = { _id: id };
            const faculty = coll.findOne(query);
            resolve(faculty);
        } catch (err) {
            reject(err);
        }
    });
}

function add(faculty) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('faculty')
            util.renameKey(faculty, 'id', '_id');
            resolve(util.addObject(coll, faculty));
        } catch (err) {
            reject(err);
        }
    })
}

function update(id, updatedFaculty) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('faculty');
            util.renameKey(updatedFaculty, 'id', '_id');
            resolve(util.updateObject(coll, id, updatedFaculty));
        } catch (err) {
            reject(err);
        }
    });
}

function remove(id, deletedFaculty) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('faculty');
            util.renameKey(deletedFaculty, 'id', '_id');
            resolve(util.deleteObject(coll, id, deletedFaculty));
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    add, update, remove, find, getById
}