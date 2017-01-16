let path = require('path');
let router = require('express').Router();

let controllerDir = path.join(__dirname, '../controllers');
let blogController = require(path.join(controllerDir, 'BlogController'));
let userController = require(path.join(controllerDir, 'UserController'));

router.get('/blogs', blogController.list);

router.get('/users', userController.list);

module.exports = router;