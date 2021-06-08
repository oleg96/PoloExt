import reducer from './credentials.js';
import {
  GET_POLONIEX_CREDENTIALS_SUCCESS,
  UPDATE_POLONIEX_CREDENTIALS_SUCCESS,
  GET_NICEHASH_CREDENTIALS_SUCCESS,
  UPDATE_NICEHASH_CREDENTIALS_SUCCESS,
  GET_NICEHASH_POOL_CREDENTIALS_SUCCESS,
  UPDATE_NICEHASH_POOL_CREDENTIALS_SUCCESS,
  UPDATE_USER_CREDENTIALS_SUCCESS
} from '../constants/actionTypes.js';

const poloniex = {
  publicKey: 'testKey',
  privateKey: 'testKey',
  success: true
};

const nicehash = {
  apiId: 'testApiId',
  apiKey: 'testApiKey',
  twoFA: 'testTwoFA',
  success: true
};

const nicehashPool = {
  poolName: 'testPoolName',
	poolHost: 'testPoolHost',
	poolPort: '3340',
	poolUsername: 'testPoolUsername',
	poolPassword: 'testPoolPassword',
	poolAlgo: 'testPoolAlgo'
};

const successMessage = {
  message: 'Updated successfully'
};

describe('credentials reducer', () => {

  it('should check GET_POLONIEX_CREDENTIALS_SUCCESS action', () => {
    expect(
      reducer([], {
        type: GET_POLONIEX_CREDENTIALS_SUCCESS,
        response: poloniex
      })
    ).toEqual(poloniex);
  });

  it('should check UPDATE_POLONIEX_CREDENTIALS_SUCCESS action', () => {
    expect(
      reducer([], {
        type: UPDATE_POLONIEX_CREDENTIALS_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check GET_NICEHASH_CREDENTIALS_SUCCESS action', () => {
    expect(
      reducer([], {
        type: GET_NICEHASH_CREDENTIALS_SUCCESS,
        response: nicehash
      })
    ).toEqual(nicehash);
  });

  it('should check UPDATE_NICEHASH_CREDENTIALS_SUCCESS action', () => {
    expect(
      reducer([], {
        type: UPDATE_NICEHASH_CREDENTIALS_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check GET_NICEHASH_POOL_CREDENTIALS_SUCCESS action', () => {
    expect(
      reducer([], {
        type: GET_NICEHASH_POOL_CREDENTIALS_SUCCESS,
        response: nicehashPool
      })
    ).toEqual(nicehashPool);
  });

  it('should check UPDATE_NICEHASH_POOL_CREDENTIALS_SUCCESS action', () => {
    expect(
      reducer([], {
        type: UPDATE_NICEHASH_POOL_CREDENTIALS_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check UPDATE_USER_CREDENTIALS_SUCCESS action', () => {
    expect(
      reducer([], {
        type: UPDATE_USER_CREDENTIALS_SUCCESS,
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
