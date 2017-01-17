let mongoose = require('mongoose');

module.exports = (app) => {
  mongoose.connect(app.get('mongouri'));
  mongoose.Promise = global.Promise;

  require('../models/Comment');
  require('../models/Post');
  require('../models/User');

  return mongoose
};