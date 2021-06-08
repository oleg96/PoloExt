import express from 'express';
const middleware = express.Router();
import config from '../../config.js';
import jwt from 'jsonwebtoken';

middleware.use(function (req, res, next) {

  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.jwtSecret, function (err, decoded) {
      if (err) {
        return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

middleware.unless = require('express-unless');

export default middleware;
