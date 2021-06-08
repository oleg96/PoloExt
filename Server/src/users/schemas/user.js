import { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    unique: false,
    required: true
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  lockDate: {
    type: Date,
    required: true,
    default: new Date(0)
  }
});

export default UserSchema;
