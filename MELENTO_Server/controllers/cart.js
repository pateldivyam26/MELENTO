const cart_service = require('../service/cartService')
const util = require('../utility/util')

function getCart(req, res) {
    res.setHeader('Content-Type', 'application/json')
    cart_service.find().then(
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

function getCartById(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    cart_service.getById(id).then((cart) => {
        if (!cart) {
            res.status(404).json({ error: 'Cart not found' });
        } else {
            util.renameKey(cart, '_id', 'id');
            res.json(cart);
        }
    });
}

function addCart(req, res) {
    res.setHeader('Content-Type', 'application/json')
    console.log("Add called")
    var id = req.body.id
    var cart = req.body
    cart_service.add(cart).then(
        res.send(JSON.stringify({ data_submitted: id }))
    )
}

function updateCart(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Update called");

    var id = req.params.id;
    var cart = req.body;

    cart_service.update(id, cart);
    res.send(JSON.stringify({ data_updated: id }));
}

function deleteCart(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Delete called");

    var id = req.params.id;
    var cart = req.body;

    cart_service.remove(id, cart);
    res.send(JSON.stringify({ data_deleted: id }));
}

module.exports = {
    getCart, getCartById, updateCart, addCart, deleteCart
}