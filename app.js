let fs = require('fs');
let path = require('path');
let express = require('express');
let app = express();
let config = require('./config');
let apiPath = path.join(__dirname, 'api');

let appVersions = fs.readdirSync(apiPath).filter((file) => {
  return fs.statSync(path.join(apiPath, file)).isDirectory();
});

app.set('port', (process.env.PORT || 5000));

app.locals.title = config.title;

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index');
});

appVersions.forEach((version) => {
  app.use(`/api/${version}`, require(path.join(__dirname, 'api', version, 'routers')));
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
