const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')

function find() {
    return new Promise((resolve, reject) => {
        var coll = util.connect('attendance')
        var items = coll.find().toArray();
        resolve(items);
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('attendance');
        var query = { _id: id };
        const attendance = coll.findOne(query);
        resolve(attendance);
    });
}

function add(attendance) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('attendance')
        util.renameKey(attendance, 'id', '_id');
        resolve(util.addObject(coll, attendance));
    })
}

function update(id, updatedAttendance) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('attendance');
        util.renameKey(updatedAttendance, 'id', '_id');
        resolve(util.updateObject(coll, id, updatedAttendance));
    });
}

function remove(id, deletedAttendance) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('attendance');
        util.renameKey(deletedAttendance, 'id', '_id');
        resolve(util.deleteObject(coll, id, deletedAttendance));
    });
}

module.exports = {
    add, update, remove, find, getById
}