import mongoose from 'mongoose';
import { NicehashSchema } from '../schemas/index.js';

const Nicehash = mongoose.model('Nicehash', NicehashSchema);

export default Nicehash;
