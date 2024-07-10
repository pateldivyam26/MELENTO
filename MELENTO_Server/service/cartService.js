const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')

function find() {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('cart')
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
            var coll = util.connect('cart');
            var query = { _id: id };
            const cart = coll.findOne(query);
            resolve(cart);
        } catch (err) {
            reject(err);
        }
    });
}

function add(cart) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('cart')
            util.renameKey(cart, 'id', '_id');
            resolve(util.addObject(coll, cart));
        } catch (err) {
            reject(err);
        }
    })
}

function update(id, updatedCart) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('cart');
            util.renameKey(updatedCart, 'id', '_id');
            resolve(util.updateObject(coll, id, updatedCart));
        } catch (err) {
            reject(err);
        }
    });
}

function remove(id, deletedCart) {
    return new Promise((resolve, reject) => {
        try {
            var coll = util.connect('cart');
            util.renameKey(deletedCart, 'id', '_id');
            resolve(util.deleteObject(coll, id, deletedCart));
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    add, update, remove, find, getById
}