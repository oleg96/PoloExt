import { Schema } from 'mongoose';

const PoloniexSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  publicKey: {
    type: String,
    unique: false,
    default: ''
  },
  privateKey: {
    type: String,
    unique: false,
    default: ''
  },
  wallet: {
    type: String,
    unique: false,
    default: ''
  },
  exchangeRatio: {
    type: String,
    unique: false,
    default: '1.07'
  }
});

export default PoloniexSchema;
