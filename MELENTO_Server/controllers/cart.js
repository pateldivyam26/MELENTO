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
            res.status(500).json({ error: 'An error occurred while fetching carts' });
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
    }).catch((err) => {
        res.status(500).json({ error: 'An error occurred while fetching the cart' });
    });
}

function addCart(req, res) {
    res.setHeader('Content-Type', 'application/json')
    var id = req.body.id
    var cart = req.body
    cart_service.add(cart).then(
        () => res.send(JSON.stringify({ data_submitted: id })),
        (err) => res.status(500).json({ error: 'An error occurred while adding the cart' })
    )
}

function updateCart(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    var cart = req.body;

    cart_service.update(id, cart).then(
        () => res.send(JSON.stringify({ data_updated: id })),
        (err) => res.status(500).json({ error: 'An error occurred while updating the cart' })
    );
}

function deleteCart(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    var cart = req.body;

    cart_service.remove(id, cart).then(
        () => res.send(JSON.stringify({ data_deleted: id })),
        (err) => res.status(500).json({ error: 'An error occurred while deleting the cart' })
    );
}

module.exports = {
    getCart, getCartById, updateCart, addCart, deleteCart
}