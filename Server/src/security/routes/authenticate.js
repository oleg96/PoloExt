const express = require('express');
const validate = require('express-validation');
const router = express.Router();

import {
  authenticate
} from '../controllers/index.js'

import {
  authenticateValidator
} from '../validators/index.js'

router.post('/authenticate', validate(authenticateValidator), authenticate);

export default router;
