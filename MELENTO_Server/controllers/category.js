const category_service = require('../service/categoryService')
const util = require('../utility/util')

function getCategory(req, res) {
    res.setHeader('Content-Type', 'application/json')
    category_service.find().then(
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

function getCategoryById(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    category_service.getById(id).then((category) => {
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            util.renameKey(category, '_id', 'id');
            res.json(category);
        }
    });
}

function addCategory(req, res) {
    res.setHeader('Content-Type', 'application/json')
    console.log("Add called")
    var id = req.body.id
    var category = req.body
    category_service.add(category).then(
        res.send(JSON.stringify({ data_submitted: id }))
    )
}

function updateCategory(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Update called");

    var id = req.params.id;
    var category = req.body;

    category_service.update(id, category);
    res.send(JSON.stringify({ data_updated: id }));
}

function deleteCategory(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Delete called");

    var id = req.params.id;
    var category = req.body;

    category_service.remove(id, category);
    res.send(JSON.stringify({ data_deleted: id }));
}

module.exports = {
    getCategory, getCategoryById, updateCategory, addCategory, deleteCategory
}