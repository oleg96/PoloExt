import reducer from './calculator.js';
import {
  GET_CALCULATOR_SUCCESS,
  GET_CALCULATOR_SPEED_SUCCESS,
  UPDATE_CALCULATOR_ORDER_SUM_SUCCESS,
  UPDATE_CALCULATOR_PRICE_SUCCESS,
  UPDATE_CALCULATOR_PROFIT_SUCCESS,
  UPDATE_CALCULATOR_SPEED_SUCCESS
} from '../constants/actionTypes.js';

const calculator = {
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
  success: true
};

const speed = {
  speed: '0.01',
  success: true
};

const successMessage = {
  message: 'Updated successfully'
};

describe('calculator reducer', () => {

  it('should check GET_CALCULATOR_SUCCESS action', () => {
    expect(
      reducer([], {
        type: GET_CALCULATOR_SUCCESS,
        calculator
      })
    ).toEqual(calculator);
  });

  it('should check GET_CALCULATOR_SPEED_SUCCESS action', () => {
    expect(
      reducer([], {
        type: GET_CALCULATOR_SPEED_SUCCESS,
        response: speed
      })
    ).toEqual(speed);
  });

  it('should check UPDATE_CALCULATOR_ORDER_SUM_SUCCESS action', () => {
    expect(
      reducer([], {
        type: UPDATE_CALCULATOR_ORDER_SUM_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check UPDATE_CALCULATOR_PRICE_SUCCESS action', () => {
    expect(
      reducer([], {
        type: UPDATE_CALCULATOR_PRICE_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });

  it('should check UPDATE_CALCULATOR_PROFIT_SUCCESS action', () => {
    expect(
      reducer([], {
        type: UPDATE_CALCULATOR_PROFIT_SUCCESS,
        response: successMessage
      })
    ).toEqual(successMessage);
  });
  
  it('should check UPDATE_CALCULATOR_SPEED_SUCCESS action', () => {
    expect(
      reducer([], {
        type: UPDATE_CALCULATOR_SPEED_SUCCESS,
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
