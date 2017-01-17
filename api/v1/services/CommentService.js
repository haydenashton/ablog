let mongoose = require('mongoose');
let Comment = mongoose.models.Comment;

class CommentService {
  get(commentId) {
    return Comment.findById(commentId).exec();
  }

  list(postId = null) {
    let query = {};

    if (postId) {
      query.post = postId;
    }
    return Comment.find(query).exec();
  }

  create(commentContent) {
    let comment = new Comment(commentContent);

    return comment.save();
  }

  update(commentContent) {
    return this.get(commentContent._id).then(comment => {
      comment.comment = commentContent.comment;

      return comment.save();
    });
  }
}

module.exports = CommentService;