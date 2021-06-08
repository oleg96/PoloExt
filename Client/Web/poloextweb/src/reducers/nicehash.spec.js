import reducer from './nicehash.js';
import {
  GET_NICEHASH_SUCCESS,
  GET_NICEHASH_SPEED_LIMIT_SUCCESS,
  NICEHASH_CANCEL_ORDER_SUCCESS,
  NICEHASH_ORDER_SUCCESS,
  NICEHASH_ORDER_CHANGE_LIMIT_SUCCESS,
  NICEHASH_ORDER_DECREASE_PRICE_SUCCESS,
  NICEHASH_ORDER_INCREASE_PRICE_SUCCESS,
  UPDATE_NICEHASH_SPEED_LIMIT_SUCCESS
} from '../constants/actionTypes.js';

const nicehash = {
  allOrders: [{
    accepted_speed: '75.32162888',
    algo: 20,
    alive: true,
    id: 3742385,
    limit_speed: '0.07',
    price: '0.417',
    type: 1,
    workers: 12
  },
  {
    accepted_speed: '75.97488543',
    algo: 20,
    alive: true,
    id: 3742388,
    limit_speed: '0.07',
    price: '0.4822',
    type: 1,
    workers: 13
  },
  {
    accepted_speed: '0',
    algo: 20,
    alive: false,
    id: 3743561,
    limit_speed: '0.01',
    price: '0.6',
    type: 0,
    workers: 0
  }],
  userBalance: {
    balance_pending: '0.00000000',
    balance_confirmed: '0.09134394'
  },
  userOrders: []
};

const speedLimit = {
  speedLimit: '0.7'
};

const successMessage = {
  message: 'Updated successfully'
};

describe('nicehash reducer', () => {

  it('should check GET_NICEHASH_SUCCESS action', () => {
    expect(
      reducer([], {
        type: GET_NICEHASH_SUCCESS,
        nicehash
      })
    ).toEqual(nicehash);
  });

  it('should check GET_NICEHASH_SPEED_LIMIT_SUCCESS action', () => {
    expect(
      reducer([], {
        type: GET_NICEHASH_SPEED_LIMIT_SUCCESS,
        response: speedLimit
      })
    ).toEqual(speedLimit);
  });

  it('should check NICEHASH_CANCEL_ORDER_SUCCESS action', () => {
    expect(
      reducer([], {
        type: NICEHASH_CANCEL_ORDER_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check NICEHASH_ORDER_SUCCESS action', () => {
    expect(
      reducer([], {
        type: NICEHASH_ORDER_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check NICEHASH_ORDER_CHANGE_LIMIT_SUCCESS action', () => {
    expect(
      reducer([], {
        type: NICEHASH_ORDER_CHANGE_LIMIT_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check NICEHASH_ORDER_DECREASE_PRICE_SUCCESS action', () => {
    expect(
      reducer([], {
        type: NICEHASH_ORDER_DECREASE_PRICE_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check NICEHASH_ORDER_INCREASE_PRICE_SUCCESS action', () => {
    expect(
      reducer([], {
        type: NICEHASH_ORDER_INCREASE_PRICE_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check UPDATE_NICEHASH_SPEED_LIMIT_SUCCESS action', () => {
    expect(
      reducer([], {
        type: UPDATE_NICEHASH_SPEED_LIMIT_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check default action', () => {
    expect(
      reducer([], {})
    ).toEqual([]);
  });
});
