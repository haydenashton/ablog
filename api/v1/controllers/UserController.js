let UserService = require('../services/UserService');
let userService = new UserService();

class UserController {
  list(req, res, next) {
    userService.list().then(users => {
      res.json(users);
    });
  }

  create(req, res, next) {
    userService.create(req.body).then(user => {
      res.json(user);
    });
  }

  update(req, res, next) {
    userService.update(req.body).then(user => {
      res.json(user);
    });
  }

  view(req, res, next) {
    userService.get(req.params.userId).then(user => {
      res.json(user);
    });
  }
}

module.exports = new UserController();