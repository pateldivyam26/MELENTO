const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')

function find() {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('users')
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
            var coll = util.connect('users');
            var query = { _id: id };
            const user = coll.findOne(query);
            resolve(user);
        } catch (err) {
            reject(err);
        }
    });
}

function add(user) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('users')
            util.renameKey(user, 'id', '_id');
            user.password = util.encrypt(user.password);
            resolve(util.addObject(coll, user));
        } catch (err) {
            reject(err);
        }
    })
}

function update(id, updatedUser) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('users');
            util.renameKey(updatedUser, 'id', '_id');
            if (updatedUser.password) {
                updatedUser.password = util.encrypt(updatedUser.password);
            }
            resolve(util.updateObject(coll, id, updatedUser));
        } catch (err) {
            reject(err);
        }
    });
}

function remove(id, deletedUser) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('users');
            util.renameKey(deletedUser, 'id', '_id');
            resolve(util.deleteObject(coll, id, deletedUser));
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    add, getById, update, remove, find
}