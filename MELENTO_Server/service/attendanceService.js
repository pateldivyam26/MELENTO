const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')

function find() {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('attendance')
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
            var coll = util.connect('attendance');
            var query = { _id: id };
            const attendance = coll.findOne(query);
            resolve(attendance);
        } catch (err) {
            reject(err);
        }
    });
}

function add(attendance) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('attendance')
            util.renameKey(attendance, 'id', '_id');
            resolve(util.addObject(coll, attendance));
        } catch (err) {
            reject(err);
        }
    })
}

function update(id, updatedAttendance) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('attendance');
            util.renameKey(updatedAttendance, 'id', '_id');
            resolve(util.updateObject(coll, id, updatedAttendance));
        } catch (err) {
            reject(err);
        }
    });
}

function remove(id, deletedAttendance) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('attendance');
            util.renameKey(deletedAttendance, 'id', '_id');
            resolve(util.deleteObject(coll, id, deletedAttendance));
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    add, update, remove, find, getById
}