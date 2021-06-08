import { Schema } from 'mongoose';

const AutomationSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  isEnabled: {
    type: Boolean,
    unique: false,
    default: false
  },
  events: {
    type: Array,
    unique: false
  }
});

export default AutomationSchema;
