import mongoose from 'mongoose';
import { AutomationSchema } from '../schemas/index.js';

const Automation = mongoose.model('Automation', AutomationSchema);

export default Automation;
