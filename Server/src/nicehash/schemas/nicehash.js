import { Schema } from 'mongoose';

const NicehashSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  apiSecret: {
    type: String,
    unique: false,
    default: ''
  },
  apiKey: {
    type: String,
    unique: false,
    default: ''
  },
  organizationId: {
    type: String,
    unique: false,
    default: ''
  },
  speedLimit: {
    type: String,
    unique: false,
    default: '0.5'
  },
  poolId: {
    type: String,
    unique: false,
    default: ''
  },
  poolAlgo: {
    type: String,
    unique: false,
    default: 'DAGGERHASHIMOTO'
  },
});

export default NicehashSchema;
