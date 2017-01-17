let path = require('path');
let router = require('express').Router();

let controllerDir = path.join(__dirname, '../controllers');
let postController = require(path.join(controllerDir, 'PostController'));
let commentController = require(path.join(controllerDir, 'CommentController'));
let userController = require(path.join(controllerDir, 'UserController'));

router.get('/posts', postController.list)
      .post('/posts', postController.create)
      .put('/posts/:postId', postController.update)
      .get('/posts/:postId', postController.view)
      .get('/posts/:postId/comments', commentController.list);


router.get('/comments', commentController.list)
      .post('/comments', commentController.create)
      .put('/comments/:commentId', commentController.update)
      .get('/comments/:commentId', commentController.view);


router.get('/users', userController.list)
      .post('/users', userController.create)
      .put('/users/:userId', userController.update)
      .get('/users/:userId', userController.view);

module.exports = router;