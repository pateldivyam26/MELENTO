const user_service = require('../service/userService')
const util = require('../utility/util')

async function getUser(req, res) {
    try {
        res.setHeader('Content-Type', 'application/json')
        const items = await user_service.find();
        const objArr = items;
        objArr.forEach((obj) => {
            util.renameKey(obj, "_id", "id");
            util.sendDecryptedPassword(obj);
        });
        const updateItems = JSON.stringify(objArr);
        res.send(updateItems);
    } catch (err) {
        console.error('Error in getUser:', err);
        res.status(500).send({ error: 'An error occurred while getting users' });
    }
}

async function getUserById(req, res) {
    try {
        res.setHeader('Content-Type', 'application/json');
        const id = req.params.id;
        const user = await user_service.getById(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            util.renameKey(user, '_id', 'id');
            res.json(user);
        }
    } catch (err) {
        console.error('Error in getUserById:', err);
        res.status(500).send({ error: 'An error occurred while getting the user' });
    }
}

async function addUser(req, res) {
    try {
        res.setHeader('Content-Type', 'application/json')
        console.log("Add called")
        var id = req.body.id
        var user = req.body
        await user_service.add(user);
        res.send(JSON.stringify({ data_submitted: id }))
    } catch (err) {
        console.error('Error in addUser:', err);
        res.status(500).send({ error: 'An error occurred while adding the user' });
    }
}

async function updateUser(req, res) {
    try {
        res.setHeader('Content-Type', 'application/json');
        console.log("Update called");

        var id = req.params.id;
        var user = req.body;

        await user_service.update(id, user);
        res.send(JSON.stringify({ data_updated: id }));
    } catch (err) {
        console.error('Error in updateUser:', err);
        res.status(500).send({ error: 'An error occurred while updating the user' });
    }
}

async function deleteUser(req, res) {
    try {
        res.setHeader('Content-Type', 'application/json');
        console.log("Delete called");

        var id = req.params.id;
        var user = req.body;

        await user_service.remove(id, user);
        res.send(JSON.stringify({ data_deleted: id }));
    } catch (err) {
        console.error('Error in deleteUser:', err);
        res.status(500).send({ error: 'An error occurred while deleting the user' });
    }
}

module.exports = {
    getUser, getUserById, updateUser, addUser, deleteUser
}