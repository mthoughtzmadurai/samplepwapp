// require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')
const Auth = require('./server/middleware/okta.auth.js')
const config = require('./server/config/config')

let auth = new Auth(config);

const app = express();
app.use(cors('/api/v1/*'))
app.use(logger('dev'))

if(process.env.NODE_ENV !== 'test'){
  app.use(auth.addUserInfo)
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/v1/', require('./server/routes'));

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = app;
