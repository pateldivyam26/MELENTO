const { MongoClient } = require("mongodb");

function connect(collection_name) {
    var conn = new MongoClient("mongodb://localhost:27017/AssessmentPortal");
    console.log("Connected to MongoDB")
    var myDB = conn.db();
    var coll = myDB.collection(collection_name);
    return coll;

}

function renameKey(obj, oldKey, newkey) {
    obj[newkey] = obj[oldKey];
    delete obj[oldKey];
}

module.exports = { connect, renameKey };
