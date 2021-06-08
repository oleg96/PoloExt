const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const RateLimit = require('express-rate-limit');

import { routes as routesUsers } from './users/index.js';
import { routes as routesAutomation } from './automation/index.js';
import { routes as routesPoloniex } from './poloniex/index.js';
import { routes as routesCalculator } from './calculator/index.js';
import { routes as routesNicehash } from './nicehash/index.js';
import { routesAuth } from './security/index.js';
import { routesMiddleware } from './security/index.js';
import automationWorkerRunner from './automation/services/automationWorker.js';

const config = require('./config.js');

const https = require('https');
const fs = require('fs');
const helmet = require('helmet');

const options = {
  key: fs.readFileSync('./keys/privkey.pem'),
  cert: fs.readFileSync('./keys/fullchain.pem'),
  dhparam: fs.readFileSync('./keys/dh-strong.pem')
};

const app = express();

mongoose.connect(config.mongo, {
  server: {
    auto_reconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  }, useNewUrlParser: true
});

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const limiter = new RateLimit({
  windowMs: 1000, // 1 second
  max: 50, // limit each IP to 50 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
app.use(limiter);

app.use(routesMiddleware.unless({
  path: [
    { /*url: '/users/register', methods: ['POST']*/ },
    { url: '/auth/authenticate', methods: ['POST'] }
  ]
}));
app.use('/users', routesUsers);
app.use('/automation', routesAutomation);
app.use('/poloniex', routesPoloniex);
app.use('/calculator', routesCalculator);
app.use('/nicehash', routesNicehash);
app.use('/auth', routesAuth);

automationWorkerRunner();
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

https.createServer(options, app).listen(3000);
