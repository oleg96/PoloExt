import express from 'express';
import validate from 'express-validation';
const router = express.Router();

import {
  register,
  update
} from '../controllers/index.js'

import {
  registerValidator,
  updateValidator,
} from '../validators/index.js'

router.post('/register', validate(registerValidator), register);
router.put('/update', validate(updateValidator), update);

export default router;
