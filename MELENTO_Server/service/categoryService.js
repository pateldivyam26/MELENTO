const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')

function find() {
    return new Promise((resolve, reject) => {
        var coll = util.connect('course_categories')
        var items = coll.find().toArray();
        resolve(items);
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('course_categories');
        var query = { _id: id };
        const category = coll.findOne(query);
        resolve(category);
    });
}

function add(category) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('course_categories')
        util.renameKey(category, 'id', '_id');
        resolve(util.addObject(coll, category));
    })
}

function update(id, updatedCategory) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('course_categories');
        util.renameKey(updatedCategory, 'id', '_id');
        resolve(util.updateObject(coll, id, updatedCategory));
    });
}

function remove(id, deletedCategory) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('course_categories');
        util.renameKey(deletedCategory, 'id', '_id');
        resolve(util.deleteObject(coll, id, deletedCategory));
    });
}

module.exports = {
    add, update, remove, find, getById
}