import { combineReducers } from 'redux';
import overview from './overview.js';
import calculator from './calculator.js';
import poloniex from './poloniex.js';
import nicehash from './nicehash.js';
import credentials from './credentials.js';
import message from './message.js';
import automation from './automation.js';
import eventsVisible from './eventsVisible.js';
import { reducer as formReducer } from 'redux-form';

const poloextweb = combineReducers({
  overview,
  calculator,
  poloniex,
  nicehash,
  message,
  credentials,
  automation,
  eventsVisible,
  form: formReducer
});

export default poloextweb;
