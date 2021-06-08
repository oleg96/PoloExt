import mongoose from 'mongoose';
import { PoloniexSchema } from '../schemas/index.js';

const Poloniex = mongoose.model('Poloniex', PoloniexSchema);

export default Poloniex;
