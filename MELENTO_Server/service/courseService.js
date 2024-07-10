const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')

function find() {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('courses')
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
            var coll = util.connect('courses');
            var query = { _id: id };
            const course = coll.findOne(query);
            resolve(course);
        } catch (err) {
            reject(err);
        }
    });
}

function add(course) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('courses')
            util.renameKey(course, 'id', '_id');
            resolve(util.addObject(coll, course));
        } catch (err) {
            reject(err);
        }
    })
}

function update(id, updatedCourse) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('courses');
            util.renameKey(updatedCourse, 'id', '_id');
            resolve(util.updateObject(coll, id, updatedCourse));
        } catch (err) {
            reject(err);
        }
    });
}

function remove(id, deletedCourse) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('courses');
            util.renameKey(deletedCourse, 'id', '_id');
            resolve(util.deleteObject(coll, id, deletedCourse));
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    add, update, remove, find, getById
}