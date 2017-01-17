let mongoose = require('mongoose');
let options = { timestamps: {} };

let userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String
  }
}, options);

module.exports = mongoose.model('User', userSchema);