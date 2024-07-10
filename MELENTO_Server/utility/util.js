const { MongoClient } = require("mongodb");
const crypto = require('crypto');
const { publicEncrypt, privateDecrypt, generateKeyPairSync } = require('crypto');
const fs = require('fs')
const path = require('path');
// In your application
require('dotenv').config();
const key = Buffer.from(process.env.AES_KEY, 'hex');
const iv = Buffer.from(process.env.AES_IV, 'hex');
const algorithm = 'aes-256-cbc';

require('dotenv').config();

function connect(collection_name) {
    var conn = new MongoClient(process.env.mongoDbURL);
    // conn.connect();
    // var myDB = conn.db('assessment');
    var myDB = conn.db();
    var coll = myDB.collection(collection_name);
    return coll;
}

function renameKey(obj, oldKey, newkey) {
    obj[newkey] = obj[oldKey];
    delete obj[oldKey];
}

function addObject(collection, object) {
    collection.insertOne(object, function (err, result) {
        if (!err) {
            console.log('Inserted: ')
            console.log(result)
        }
    })
}
function updateObject(collection, id, updatedObject) {
    return collection.updateOne({ _id: id }, { $set: updatedObject }, function (err, result) {
        if (!err) {
            console.log('Updated: ')
            console.log(result)
        } else {
            console.error('Error updating object: ', err);
        }
    });
}
function deleteObject(collection, id, deletedObject) {
    return collection.deleteOne({ _id: id }, { $set: deletedObject }, function (err, result) {
        if (!err) {
            console.log('Deleted: ')
            console.log(result)
        } else {
            console.error('Error deleting object: ', err);
        }
    });
}


function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(encryptedText) {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { connect, renameKey, addObject, updateObject, deleteObject, encrypt, decrypt };

//change the encrypt back into decrypt