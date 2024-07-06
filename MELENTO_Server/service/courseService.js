const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')

function find() {
    return new Promise((resolve, reject) => {
        var coll = util.connect('courses')
        var items = coll.find().toArray();
        resolve(items);
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('courses');
        var query = { _id: id };
        const course = coll.findOne(query);
        resolve(course);
    });
}

function add(course) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('courses')
        util.renameKey(course, 'id', '_id');
        resolve(util.addObject(coll, course));
    })
}

function update(id, updatedCourse) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('courses');
        util.renameKey(updatedCourse, 'id', '_id');
        resolve(util.updateObject(coll, id, updatedCourse));
    });
}

function remove(id, deletedCourse) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('courses');
        util.renameKey(deletedCourse, 'id', '_id');
        resolve(util.deleteObject(coll, id, deletedCourse));
    });
}

module.exports = {
    add, update, remove, find, getById
}