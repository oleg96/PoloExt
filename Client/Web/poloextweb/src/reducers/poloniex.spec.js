import reducer from './poloniex.js';
import {
  GET_POLONIEX_SUCCESS,
  GET_POLONIEX_EXCHANGE_RATIO_SUCCESS,
  GET_POLONIEX_WALLET_SUCCESS,
  POLONIEX_CANCEL_EXCHANGE_SUCCESS,
  POLONIEX_EXCHANGE_SUCCESS,
  POLONIEX_WITHDRAW_SUCCESS,
  UPDATE_POLONIEX_EXCHANGE_RATIO_SUCCESS,
  UPDATE_POLONIEX_WALLET_SUCCESS
} from '../constants/actionTypes.js';

const poloniex = {
  balances: {
    success: true,
    data: {
      BTC: '0.00000000',
      ETH: '0.00000000'
    }
  },
  chart: {
    success: true,
    data: [{
      close: 0.00066675,
      date: 1510435800,
      high: 0.00066675,
      low: 0.00065734,
      open: 0.00066062,
      quoteVolume: 3558.23031904,
      volume: 2.36398059,
      weightedAverage: 0.00066436,
    }]
  },
  depositsWithdrawals: {
    success: true,
    data: {
      deposits: [{
        address: 'Ve1u3tdwdRxPyoMXsYNDuvLZJB4wFeQQF1',
        amount: '144.65598572',
        confirmations: 5,
        currency: 'ETH',
        status: 'COMPLETE',
        timestamp: 1511727847,
        txid: '0f999179c50234c612590303fc2d68b2e064fcf87e2e90df89f553a0c4bbf948'
      }],
      withdrawals: [{
        address: '3PM5dxrK6atXhXvyDd296awq9Dpsbzzwub',
        amount: '0.13187916',
        currency: 'BTC',
        fee: '0.00010000',
        ipAddress: '185.14.31.161',
        status: 'COMPLETE: 30fa4734e3adc4f514423db5ba5b4a5c7d026bea7f6959a88cf6e8756fa3b9d9',
        timestamp: 1511622931,
        withdrawalNumber: 8400197
      }]
    }
  },
  lastPriceUsd: {
    success: true,
    data: '6454.03780378'
  },
  lastPriceEth: {
    success: true,
    data: '0.00009177'
  },
  orders: {
    success: true,
    data: [{
      amount: '59.82321942',
      date: '2018-11-08 20:31:27',
      margin: 0,
      orderNumber: '46160569324',
      rate: '0.00042000',
      startingAmount: '59.82321942',
      total: '0.02512575',
      type: 'sell'
    }]
  }
};

const successMessage = {
  message: 'Updated successfully'
};

const exchangeRatio = {
  exchangeRatio: '1.07'
};

const wallet = {
  wallet: 'testwallet'
};

describe('poloniex reducer', () => {

  it('should check GET_POLONIEX_SUCCESS action', () => {
    expect(
      reducer([], {
        type: GET_POLONIEX_SUCCESS,
        poloniex
      })
    ).toEqual(poloniex);
  });

  it('should check GET_POLONIEX_EXCHANGE_RATIO_SUCCESS action', () => {
    expect(
      reducer([], {
        type: GET_POLONIEX_EXCHANGE_RATIO_SUCCESS,
        response: exchangeRatio
      })
    ).toEqual(exchangeRatio);
  });

  it('should check GET_POLONIEX_WALLET_SUCCESS action', () => {
    expect(
      reducer([], {
        type: GET_POLONIEX_WALLET_SUCCESS,
        response: wallet
      })
    ).toEqual(wallet);
  });

  it('should check POLONIEX_CANCEL_EXCHANGE_SUCCESS action', () => {
    expect(
      reducer([], {
        type: POLONIEX_CANCEL_EXCHANGE_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check POLONIEX_EXCHANGE_SUCCESS action', () => {
    expect(
      reducer([], {
        type: POLONIEX_EXCHANGE_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check POLONIEX_WITHDRAW_SUCCESS action', () => {
    expect(
      reducer([], {
        type: POLONIEX_WITHDRAW_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check UPDATE_POLONIEX_EXCHANGE_RATIO_SUCCESS action', () => {
    expect(
      reducer([], {
        type: UPDATE_POLONIEX_EXCHANGE_RATIO_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check UPDATE_POLONIEX_WALLET_SUCCESS action', () => {
    expect(
      reducer([], {
        type: UPDATE_POLONIEX_WALLET_SUCCESS,
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
