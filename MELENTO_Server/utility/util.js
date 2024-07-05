const { MongoClient } = require("mongodb");
require('dotenv').config();
function connect(collection_name) {
    var conn = new MongoClient(process.env.mongoDbURL);
    console.log("Connected to MongoDB")
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
module.exports = { connect, renameKey, addObject,updateObject };
