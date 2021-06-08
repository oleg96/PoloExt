import { Schema } from 'mongoose';

const CalculatorSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  profit: {
    type: String,
    unique: false,
    default: '7'
  },
  price: {
    type: String,
    unique: false,
    default: '0'
  },
  orderSum: {
    type: String,
    unique: false,
    default: '0.5'
  },
  speed: {
    type: String,
    unique: false,
    default: '0.01'
  }
});

export default CalculatorSchema;
