let passport = require('passport');
let GitHubStrategy = require('passport-github').Strategy;

module.exports = (User) => {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ githubId: profile.id }).exec().then(user => {
      if (user) return cb(null, user);

      let newUser = new User({
        githubId: profile.id
      });

      newUser.save().then((user) => {
        return cb(null, user);
      });
    }).catch(cb);
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  return passport;
};