import mongoose from 'mongoose';
import { CalculatorSchema } from '../schemas/index.js';

const Calculator = mongoose.model('Calculator', CalculatorSchema);

export default Calculator;
