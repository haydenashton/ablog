let mongoose = require('mongoose');
let options = { timestamps: {} };

let commentSchema = new mongoose.Schema({
  comment: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
}, options);

module.exports = mongoose.model('Comment', commentSchema);