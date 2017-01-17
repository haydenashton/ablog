let User = require('./models/User');
let Post = require('./models/Post');
let Comment = require('./models/Comment');

module.exports.routes = require('./routers');
module.exports.models = {
  User,
  Post,
  Comment
};