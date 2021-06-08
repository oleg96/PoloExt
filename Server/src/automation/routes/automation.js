import express from 'express';
import validate from 'express-validation';
const router = express.Router();

import {
  automation,
  updateAutomation
} from '../controllers/index.js'

import {
  automationValidator,
  updateAutomationValidator
} from '../validators/index.js'

router.get('/automation', validate(automationValidator), automation);
router.put('/updateAutomation', validate(updateAutomationValidator), updateAutomation);

export default router;
