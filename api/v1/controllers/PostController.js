let PostService = require('../services/PostService');
let postService = new PostService();

class PostController {
  list(req, res, next) {
    postService.list().then(posts => {
      res.json(posts);
    });
  }

  create(req, res, next) {
    req.body.user = req.user._id;

    postService.create(req.body).then(post => {
      res.json(post);
    });
  }

  update(req, res, next) {
    postService.update(req.body).then(post => {
      res.json(post);
    });
  }

  view(req, res, next) {
    postService.get(req.params.postId).then(post => {
      res.json(post);
    });
  }
}

module.exports = new PostController();