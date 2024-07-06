const fs = require('fs').promises
const path = require('path')
const util = require('../utility/util')

function find() {
    return new Promise((resolve, reject) => {
        var coll = util.connect('cart')
        var items = coll.find().toArray();
        resolve(items);
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('cart');
        var query = { _id: id };
        const cart = coll.findOne(query);
        resolve(cart);
    });
}

function add(cart) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('cart')
        util.renameKey(cart, 'id', '_id');
        resolve(util.addObject(coll, cart));
    })
}

function update(id, updatedCart) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('cart');
        util.renameKey(updatedCart, 'id', '_id');
        resolve(util.updateObject(coll, id, updatedCart));
    });
}

function remove(id, deletedCart) {
    return new Promise((resolve, reject) => {
        var coll = util.connect('cart');
        util.renameKey(deletedCart, 'id', '_id');
        resolve(util.deleteObject(coll, id, deletedCart));
    });
}

module.exports = {
    add, update, remove, find, getById
}