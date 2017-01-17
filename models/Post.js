let mongoose = require('mongoose');
let options = { timestamps: {} };

let postSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, options);

module.exports = mongoose.model('Post', postSchema);