let fs = require('fs');
let path = require('path');
let express = require('express');
let app = express();
let config = require('./config');
let apiPath = path.join(__dirname, 'api');

let appVersions = fs.readdirSync(apiPath).filter((file) => {
  return fs.statSync(path.join(apiPath, file)).isDirectory();
});

app.set('env', (process.env.NODE_ENV || 'development'));
app.set('port', (process.env.PORT || 5000));
app.set('mongouri', (process.env.MONGODB_URI || config.mongouri));

let mongoose = require('./config/mongoose')(app);
let passport = require('./config/auth')(mongoose.models.User);

app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback',
  passport.authenticate('github', { successReturnToOrRedirect: '/', failureRedirect: '/auth/github' }),
  function (req, res) {
    res.redirect('/');
  });

app.all('/api/*', require('connect-ensure-login').ensureLoggedIn('/auth/github'));
appVersions.forEach((version) => {
  app.use(`/api/${version}`, require(path.join(__dirname, 'api', version)).routes);
});

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
