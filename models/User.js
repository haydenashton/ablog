let mongoose = require('mongoose');
let options = { timestamps: {} };

let userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  githubId: {
    type: String,
    unique: true
  }
}, options);

module.exports = mongoose.model('User', userSchema);