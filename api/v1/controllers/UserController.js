class UserController {
  list(req, res, next) {
    res.json({
      resource: 'users',
      results: []
    });
  }
}

module.exports = new UserController();