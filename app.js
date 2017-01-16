let express = require('express');
let app = express();
let config = require('./config');

app.set('port', (process.env.PORT || 5000));

app.locals.title = config.title;

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
