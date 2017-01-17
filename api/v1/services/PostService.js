let Post = require('../models/Post');

class PostService {
  get(postId) {
    return Post.findById(postId).exec();
  }

  list() {
    return Post.find({}).exec();
  }

  create(postContent) {
    let post = new Post(postContent);

    return post.save();
  }

  update(postContent) {
    return this.get(postContent._id).then(post => {
      post.title = postContent.title;
      post.content = postContent.content;

      return post.save();
    });
  }
}

module.exports = PostService;