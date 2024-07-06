const user_service = require('../service/userService')
const util = require('../utility/util')

function getUser(req, res) {
    res.setHeader('Content-Type', 'application/json')
    user_service.find().then(
        (items) => {
            const objArr = items;
            objArr.forEach((obj) => {
                util.renameKey(obj, "_id", "id");
            });
            const updateItems = JSON.stringify(objArr);
            res.send(updateItems);
        },
        (err) => {
            console.log('Promise Rejected')
            console.log(err)
        }
    )
}

function getUserById(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    user_service.getById(id).then((user) => {
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            util.renameKey(user, '_id', 'id');
            res.json(user);
        }
    });
}

function addUser(req, res) {
    res.setHeader('Content-Type', 'application/json')
    console.log("Add called")
    var id = req.body.id
    var user = req.body
    user_service.add(user).then(
        res.send(JSON.stringify({ data_submitted: id }))
    )
}

function updateUser(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Update called");

    var id = req.params.id;
    var user = req.body;

    user_service.update(id, user);
    res.send(JSON.stringify({ data_updated: id }));
}

function deleteUser(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Delete called");

    var id = req.params.id;
    var user = req.body;

    user_service.remove(id, user);
    res.send(JSON.stringify({ data_deleted: id }));
}

module.exports = {
    getUser, getUserById, updateUser, addUser, deleteUser
}