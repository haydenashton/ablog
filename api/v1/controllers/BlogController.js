class BlogController {
  list(req, res, next) {
    res.json({
      resource: 'blogs',
      results: []
    });
  }
}

module.exports = new BlogController();