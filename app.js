let fs = require('fs');
let path = require('path');
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let config = require('./config');
let apiPath = path.join(__dirname, 'api');

let appVersions = fs.readdirSync(apiPath).filter((file) => {
  return fs.statSync(path.join(apiPath, file)).isDirectory();
});

app.set('port', (process.env.PORT || 5000));
app.set('mongouri', (process.env.MONGODB_URI || config.mongouri))

mongoose.connect(app.get('mongouri'));
mongoose.Promise = global.Promise;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

appVersions.forEach((version) => {
  app.use(`/api/${version}`, require(path.join(__dirname, 'api', version)).routes);
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
