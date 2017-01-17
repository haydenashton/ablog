let fs = require('fs');
let path = require('path');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
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

app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/github' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.use(bodyParser.json());

appVersions.forEach((version) => {
  app.use(`/api/${version}`, require(path.join(__dirname, 'api', version)).routes);
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
