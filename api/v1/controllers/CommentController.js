let CommentService = require('../services/CommentService');
let commentService = new CommentService();

class CommentController {
  list(req, res, next) {
    commentService.list().then(comments => {
      res.json(comments);
    });
  }

  create(req, res, next) {
    commentService.create(req.body).then(comment => {
      res.json(comment);
    });
  }

  update(req, res, next) {
    commentService.update(req.body).then(comment => {
      res.json(comment);
    });
  }

  view(req, res, next) {
    commentService.get(req.params.commentId).then(comment => {
      res.json(comment);
    });
  }
}

module.exports = new CommentController();