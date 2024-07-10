const { MongoClient } = require("mongodb");
const crypto = require('crypto');
const { publicEncrypt, privateDecrypt, generateKeyPairSync } = require('crypto');
const fs = require('fs')
const path = require('path');

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});
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
    const encrypted = publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(text)
    );
    return encrypted.toString('base64');
}

function decrypt(encryptedText) {
    const decrypted = privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(encryptedText, 'base64')
    );
    return decrypted.toString();
}

module.exports = { connect, renameKey, addObject, updateObject, deleteObject, encrypt, decrypt };
