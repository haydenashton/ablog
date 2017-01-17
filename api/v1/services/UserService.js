let mongoose = require('mongoose');
let User = mongoose.models.User;

class UserService {
  get(userId) {
    return User.findById(userId).exec();
  }

  list() {
    return User.find({}).exec();
  }

  create(userContent) {
    let user = new User(userContent);

    return user.save();
  }

  update(userContent) {
    return this.get(userContent._id).then(user => {
      user.name = userContent.name;

      return user.save();
    });
  }
}

module.exports = UserService;