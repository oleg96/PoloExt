import reducer from './overview.js';
import {
  GET_OVERVIEW_SUCCESS
} from '../constants/actionTypes.js';

const overview = {
  calculatedSum: '0.50984177',
  calculatedSumUsd: '3288.3',
  coins: '4590.5',
  coinsBTC: '0.4245',
  difficulty: '109555',
  lastPriceUsd: '6449.59999999',
  lastPriceEth: '0.00009247',
  orderSum: '0.5',
  pastDayPriceUsd: '6394.39999997',
  pastDayPriceEth: '0.00009300',
  price: '0.395',
  profit: '7',
  profitability: '1.97',
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
  userOrders: [],
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

describe('overview reducer', () => {

  it('should check GET_OVERVIEW_SUCCESS action', () => {
    expect(
      reducer([], {
        type: GET_OVERVIEW_SUCCESS,
        overview
      })
    ).toEqual(overview);
  });

  it('should check default action', () => {
    expect(
      reducer([], {})
    ).toEqual([]);
  });
});
